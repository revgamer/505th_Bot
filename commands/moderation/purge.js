const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('🧹 Deletes recent messages (up to 100)')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('How many messages to delete (1–100)')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const allowedRoleId = '1383875115024126154';
      const amount = interaction.options.getInteger('amount');

      if (!interaction.member.roles.cache.has(allowedRoleId)) {
        return await interaction.reply({
          content: '❌ You do not have permission to use this command.',
          ephemeral: true
        });
      }

      if (amount < 1 || amount > 100) {
        return await interaction.reply({
          content: '❌ You must enter a number between 1 and 100.',
          ephemeral: true
        });
      }

      await interaction.deferReply({ ephemeral: true });

      const deletedMessages = await interaction.channel.bulkDelete(amount, true);

      await interaction.editReply({
        content: `🧹 Successfully deleted ${deletedMessages.size} message(s).`
      });

    } catch (error) {
      console.error('❌ Purge command error:', error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: '⚠️ An error occurred while executing this command.',
          ephemeral: true
        });
      } else if (interaction.deferred) {
        await interaction.editReply({
          content: '⚠️ An error occurred while deleting messages.'
        });
      }
    }
  }
};
