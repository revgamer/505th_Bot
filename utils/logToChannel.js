const { EmbedBuilder } = require('discord.js');
const { logChannelId } = require('../config.json'); // adjust if needed

module.exports = async function logToChannel(client, title, description, color = 0x2B2D31) {
  const logChannel = await client.channels.fetch(logChannelId).catch(() => null);
  if (!logChannel || !logChannel.isTextBased()) return;

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();

  await logChannel.send({ embeds: [embed] });
};
