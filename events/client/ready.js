const log = require('../../utils/logger.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    log(`Bot is online as ${client.user.tag}`, 'READY');

    client.user.setActivity('the 505th Deployment', { type: 'WATCHING' });
    log('Status set to: Watching the 505th Deployment', 'STATUS');
  }
};
