const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const { rulesChannelId } = require('../../config.json');

module.exports = {
  name: 'ready',
  async execute(client) {
    const filePath = path.join(__dirname, '../../data/rulesMessage.json');
    const channel = await client.channels.fetch(rulesChannelId).catch(() => null);
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
      .setTitle('# Server Rules')
      .setDescription([
        '**1. No NSFW**',
        '**2. Be respectful. Don’t be annoying.**',
        '**3. No advertising.**',
        '**4. No GIF or message spamming.**',
        '**5. Zero tolerance for harassment, racism, sexism — casual or otherwise.**',
        '**6. TeamSpeak/Arma access is for 505th members only.**',
        '**7. Must be 18+ to join.**',
        '\n*These rules are subject to change.*'
      ].join('\n'))
      .setColor(0xEDC531)
      .setFooter({ text: client.user.username })
      .setTimestamp();

    const message = await channel.send({ embeds: [embed] });
    fs.writeFileSync(filePath, JSON.stringify({ id: message.id }, null, 2));
  }
};
