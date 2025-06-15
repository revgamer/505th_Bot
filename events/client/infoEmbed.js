const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const { infoChannelId } = require('../../config.json');

module.exports = {
  name: 'ready',
  async execute(client) {
    const filePath = path.join(__dirname, '../../data/infoMessage.json');
    const channel = await client.channels.fetch(infoChannelId).catch(() => null);
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
      .setTitle('__**505th Information**__')
      .setDescription([
        '**505th Arma Server**',
        'nanw-ogs9.armahosts.com',
        'Port: `2372`',
        'Password: `505th`',
        '',
        '**505th Teamspeak**',
        'IP: `38.133.154.60:9041`',
        'Password: `505`',
        '',
        '**Plugin:**\n[Download Task Force Radio Plugin](https://github.com/michail-nikolaev/task-force-arma-3-radio/releases)',
        '',
        '**505th Member Roster**\n[View Roster](https://docs.google.com/spreadsheets/d/1_9YoQXvLVIwrbbLuNHmu8rwH2UNUeM1RyNsXpAtPN3Y/edit?gid=0#gid=0)'
      ].join('\n'))
      .setColor(0x2B2D31)
      .setFooter({ text: '505th Expeditionary Force – Server Info' })
      .setTimestamp();

    const message = await channel.send({ embeds: [embed] });
    fs.writeFileSync(filePath, JSON.stringify({ id: message.id }, null, 2));
  }
};
