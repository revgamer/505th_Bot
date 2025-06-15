const logToChannel = require('../../utils/logToChannel.js');

module.exports = {
  name: 'messageDelete',
  async execute(message, client) {
    console.log('[DEBUG] messageDelete event fired');

    try {
      if (message.partial || message.author?.bot) return;

      const member = await message.guild.members.fetch(message.author.id).catch(() => null);
      const displayName = member ? member.displayName : message.author.tag;
      const channel = message.channel?.toString() || 'Unknown Channel';
      const content = message.content || '*No content*';

      await logToChannel(
        client,
        '🗑️ Message Deleted',
        `**Author:** ${displayName}\n**Channel:** ${channel}\n**Content:**\n${content}`
      );
    } catch (err) {
      console.error('❌ messageDelete logging failed:', err);
    }
  }
};
