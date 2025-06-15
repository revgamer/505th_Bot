const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const { handbookChannelId } = require('../../config.json');

module.exports = {
  name: 'ready',
  async execute(client) {
    const filePath = path.join(__dirname, '../../data/handbookMessage.json');
    const channel = await client.channels.fetch(handbookChannelId).catch(() => null);
    if (!channel || !channel.isTextBased()) return;

    let savedId;
    try {
      savedId = JSON.parse(fs.readFileSync(filePath, 'utf-8')).id;
    } catch {
      savedId = null;
    }

    if (savedId) {
      const existing = await channel.messages.fetch(savedId).catch(() => null);
      if (existing) return;
    }

    const embed = new EmbedBuilder()
      .setTitle('__**505th HANDBOOKS**__')
      .setDescription(
        `### General Handbook\n[Click to open](https://docs.google.com/document/d/152vTdJQohSe1YtpwLaiCcCjN5NKCiLDr7l63izAF45E/edit?tab=t.0#heading=h.a832kr3cmzm)\n\n` +
        `### Radio Handbook\n[Click to open](https://docs.google.com/document/d/1Xc7_GCCpZwotRZTe7XltlKQOIvLwTlDDHyCCAezlc70/edit?tab=t.0#heading=h.a832kr3cmzm)`
      )
      .setColor(0x2B2D31)
      .setFooter({ text: '505th Expeditionary Force – Reference Library' })
      .setTimestamp();

    const message = await channel.send({ embeds: [embed] });
    fs.writeFileSync(filePath, JSON.stringify({ id: message.id }, null, 2));
  }
};
