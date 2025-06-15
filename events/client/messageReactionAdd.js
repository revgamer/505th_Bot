const fs = require('fs');
const { roleIds, logChannelId } = require('../../config.json');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    if (user.bot || !reaction.message.guild) return;

    const messageId = JSON.parse(fs.readFileSync('./data/roleMessage.json', 'utf-8')).id;
    if (reaction.message.id !== messageId) return;

    const emojiToRoleId = {
      '🟣': roleIds.events,
      '🟡': roleIds.gameNights,
      '🟠': roleIds.movieNights,
      '🟤': roleIds.modUpdates
    };

    const roleId = emojiToRoleId[reaction.emoji.name];
    if (!roleId) return;

    const member = await reaction.message.guild.members.fetch(user.id).catch(() => null);
    const role = reaction.message.guild.roles.cache.get(roleId);
    if (!member || !role) return;

    await member.roles.add(role).catch(console.error);
    console.log(`[DEBUG] Added role for ${member.displayName}: ${role.name}`);

    const logChannel = await reaction.message.guild.channels.fetch(logChannelId).catch(() => null);
    if (logChannel && logChannel.isTextBased()) {
      await logChannel.send({
        content: `✅ \`${member.displayName}\` was **given** the \`${role.name}\` role via reaction ${reaction.emoji.name}`
      });
    }
  }
};
