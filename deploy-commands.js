// Load environment variables from .env
require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Config values from config.json
const { clientId, guildId } = require('./config.json');

// Discord bot token from .env
const token = process.env.DISCORD_TOKEN;

// Load all slash commands
const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.warn(`[WARNING] The command at ${filePath} is missing "data" or "execute".`);
    }
  }
}

// Register commands using Discord REST API
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🔁 Refreshing application slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log('✅ Successfully reloaded application commands.');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
})();
