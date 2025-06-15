const { EmbedBuilder } = require('discord.js');
const { logChannelId } = require('../../config.json');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    console.log('[DEBUG] guildMemberAdd event fired');

    const user = member.user;
    const displayName = member.displayName;
    const logChannel = await client.channels.fetch(logChannelId).catch(() => null);
    if (!logChannel || !logChannel.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setColor(0x3BA55D)
      .setAuthor({ name: `${displayName} joined`, iconURL: user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '📛 Display Name', value: displayName, inline: true },
        { name: '📆 Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
        { name: '🔔 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true }
      )
      .setFooter({ text: 'Member Joined' })
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });
  }
};
