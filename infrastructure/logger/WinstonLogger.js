const winston = require('winston')
const colors = require('colors')

module.exports = class {

    constructor ({ logfile }) {
        
        this.logger = winston.createLogger({ 
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.splat(),
                winston.format.colorize(),
                winston.format.printf(info => {
                    return `${colors.blue(info.timestamp)} [${info.level}] ${info.message}`
                })
            ),
            transports: [
                new winston.transports.Console()
            ],
            exceptionHandlers: [
                new winston.transports.Console()
            ],
            exitOnError: false
        })
        if (logfile) {
            this.logger.add(new winston.transports.File({ 
                filename: logfile,
                handleExceptions: true
            }))
        }
    }

    log (level, namespace, message, ...meta) {
        this.logger.log(level, `[${colors.magenta(namespace)}] ${message}`, ...meta)
    }
}