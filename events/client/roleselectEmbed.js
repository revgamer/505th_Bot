const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const { roleSelectChannelId } = require('../../config.json');

module.exports = {
  name: 'ready',
  async execute(client) {
    const filePath = path.join(__dirname, '../../data/roleMessage.json');
    const channel = await client.channels.fetch(roleSelectChannelId).catch(() => null);
    if (!channel || !channel.isTextBased()) return;

    let savedId;
    try {
      savedId = JSON.parse(fs.readFileSync(filePath, 'utf-8')).id;
    } catch {
      savedId = null;
    }

    if (savedId) {
      const existing = await channel.messages.fetch(savedId).catch(() => null);
      if (existing) {
        client.roleMessageId = savedId;
        return;
      }
    }

    const embed = new EmbedBuilder()
      .setTitle('📌 Select Your Notification Roles')
      .setDescription(
        `React to this message to receive notifications for the following events:\n\n` +
        `🟣 — **Events**\n` +
        `🟡 — **Game Nights**\n` +
        `🟠 — **Movie Nights**\n` +
        `🟤 — **Mod Updates**\n\n` +
        `*You can remove the role later by unreacting.*`
      )
      .setFooter({ text: client.user.username })
      .setColor(0x5865F2);

    const message = await channel.send({ embeds: [embed] });
    for (const emoji of ['🟣', '🟡', '🟠', '🟤']) {
      await message.react(emoji);
    }

    client.roleMessageId = message.id;
    fs.writeFileSync(filePath, JSON.stringify({ id: message.id }, null, 2));
  }
};
