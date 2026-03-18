import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.resolve(process.cwd(), 'src/logging');
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		}),
		new winston.transports.File({
			filename: path.join(logDir, 'test.log'),
			level: 'info'
		})
	]
});

export class LoggerUtil {
	static info(message: string, meta?: any) {
		logger.info(message, meta);
	}
	static warn(message: string, meta?: any) {
		logger.warn(message, meta);
	}
	static error(message: string, meta?: any) {
		logger.error(message, meta);
	}
	static debug(message: string, meta?: any) {
		logger.debug(message, meta);
	}
}
