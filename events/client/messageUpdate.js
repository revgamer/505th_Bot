const logToChannel = require('../../utils/logToChannel.js');

module.exports = {
  name: 'messageUpdate',
  async execute(oldMessage, newMessage, client) {
    console.log('[DEBUG] messageUpdate event fired');

    try {
      if (
        oldMessage.partial ||
        newMessage.partial ||
        oldMessage.author?.bot ||
        oldMessage.content === newMessage.content
      ) return;

      const member = await oldMessage.guild.members.fetch(oldMessage.author.id).catch(() => null);
      const displayName = member ? member.displayName : oldMessage.author.tag;
      const channel = oldMessage.channel?.toString() || 'Unknown Channel';
      const oldContent = oldMessage.content || '*No content*';
      const newContent = newMessage.content || '*No content*';

      await logToChannel(
        client,
        '✏️ Message Edited',
        `**Author:** ${displayName}\n**Channel:** ${channel}\n\n**Before:**\n${oldContent}\n\n**After:**\n${newContent}`
      );
    } catch (err) {
      console.error('❌ messageUpdate logging failed:', err);
    }
  }
};
