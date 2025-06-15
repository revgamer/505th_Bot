module.exports = {
  log: (message) => {
    console.log(`[LOG] ${new Date().toLocaleTimeString()} | ${message}`);
  },
  error: (message) => {
    console.error(`[ERROR] ${new Date().toLocaleTimeString()} | ${message}`);
  }
};
