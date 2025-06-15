const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('📢 Send a bold announcement message.')
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Bold heading for the announcement')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Main body of the announcement')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const allowedRoleId = '1383875115024126154';
      const title = interaction.options.getString('title');
      const message = interaction.options.getString('message');

      if (!interaction.member.roles.cache.has(allowedRoleId)) {
        return await interaction.reply({
          content: '❌ You do not have permission to use this command.',
          ephemeral: true
        });
      }

      await interaction.reply({ content: '✅ Announcement posted.', ephemeral: true });
      await interaction.channel.send(`**${title}**\n${message}`);
    } catch (error) {
      console.error('❌ Announce command error:', error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: '⚠️ Failed to send announcement.',
          ephemeral: true
        });
      }
    }
  }
};
