const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction] // ✅ important
});

// Load handlers
['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);
