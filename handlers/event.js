const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  const folders = fs.readdirSync('./events');

  for (const folder of folders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      const event = require(`../events/${folder}/${file}`);
      if (event && event.name && typeof event.execute === 'function') {
        client.on(event.name, (...args) => event.execute(...args, client));
      } else {
        console.warn(`[WARNING] Event at ${file} is missing required properties.`);
      }
    }
  }
};
