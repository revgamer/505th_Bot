// 505th_Bot/utils/logger.js
const chalk = require('chalk');

module.exports = function log(msg, type = 'INFO') {
  const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
  const tag = {
    INFO: chalk.blueBright('[INFO]'),
    READY: chalk.greenBright('[READY]'),
    ERROR: chalk.redBright('[ERROR]'),
    STATUS: chalk.cyan('[STATUS]'),
    COMMAND: chalk.magenta('[CMD]')
  }[type] || chalk.gray('[LOG]');

  console.log(`${chalk.gray(`[${time}]`)} ${tag} ${msg}`);
};
