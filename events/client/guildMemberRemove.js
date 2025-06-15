const { EmbedBuilder } = require('discord.js');
const { logChannelId } = require('../../config.json');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member, client) {
    console.log('[DEBUG] guildMemberRemove event fired');

    const user = member.user;
    const displayName = member.displayName;
    const logChannel = await client.channels.fetch(logChannelId).catch(() => null);
    if (!logChannel || !logChannel.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setAuthor({ name: `${displayName} left`, iconURL: user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '📛 Display Name', value: displayName, inline: true },
        { name: '📆 Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true }
      )
      .setFooter({ text: 'Member Left or Removed' })
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });
  }
};
