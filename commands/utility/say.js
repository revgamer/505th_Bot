const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('📢 Make the bot say something.')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Text the bot should send')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const allowedRoleId = '1383875115024126154';
      const message = interaction.options.getString('message');

      if (!interaction.member.roles.cache.has(allowedRoleId)) {
        return await interaction.reply({
          content: '❌ You do not have permission to use this command.',
          ephemeral: true
        });
      }

      await interaction.reply({ content: '✅ Message sent.', ephemeral: true });
      await interaction.channel.send({ content: message });

    } catch (error) {
      console.error('❌ Say command error:', error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: '⚠️ Something went wrong.',
          ephemeral: true
        });
      }
    }
  }
};
