// simpleLogger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log'); // Log file path

const log = (level, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

  // Print to console
  console.log(logMessage.trim());

  // Append to log file
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

const logger = {
  info: (message) => log("info", message),
  warn: (message) => log("warn", message),
  error: (message) => log("error", message),
};

module.exports = logger;