import pino, { type LoggerOptions } from 'pino'

const isProd = process.env.NODE_ENV === 'production'

const pinoOptions: LoggerOptions = {
	level: isProd ? 'info' : 'debug',

	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			translateTime: isProd ? "YYYY-MM-DD HH:MM:SS" : "HH:MM:ss",
			ignore: 'pid,hostname',
		}
	}
}

const logger = pino(pinoOptions)

export default logger
