const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong and latency'),

  async execute(interaction) {
    await interaction.reply({ content: '🏓 Pinging...' });

    const sent = await interaction.fetchReply();
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    await interaction.editReply(`🏓 Pong!\nLatency: ${latency}ms\nAPI Latency: ${apiLatency}ms`);
  }
};
