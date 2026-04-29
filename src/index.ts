import { runBot } from '@/bot/bot.js'
import chalk from 'chalk'
import { startServer } from './web/server.js'

async function init() {
	console.log(
		chalk
			.green(chalk.bold('Welcome to aterbot!'))
			.padStart(process.stdout.columns / 2, ' ')
	)

	await startServer()

	console.log('Starting bot...')
	const bot = await runBot()
	console.log('Bot started ✅ \n')

	console.log(chalk.bold('Bot info:'))
	console.log(
		chalk.yellow(chalk.bold('Name:')) + chalk.yellow(bot.botInfo.first_name)
	)

	console.log(
		chalk.yellow(chalk.bold('Link:')) +
			chalk.yellow(
				'https://t.me/' + bot.botInfo.username
			),
		'\n'
	)

	let running = true
	const exit = () => {
		if (!running) return
		running = false
		console.log('\nStopping process...')
		bot.stop()
		process.exit(0)
	}
	process.once('SIGINT', exit)
	process.once('SIGTERM', exit)
}

init()
