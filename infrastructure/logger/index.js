const WinstonLogger = require('./WinstonLogger')

module.exports = new WinstonLogger({ logfile: process.env.LOG_FILE })