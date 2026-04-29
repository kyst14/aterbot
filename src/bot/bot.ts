import {
	Conversation,
	conversations,
	type ConversationFlavor
} from '@grammyjs/conversations'
import disposableDomains from 'disposable-email-domains' with { type: 'json' };
import 'dotenv/config'
import { Bot, type Context } from 'grammy'
import { z } from 'zod'

const BOT_TOKEN = process.env.BOT_TOKEN

if (!BOT_TOKEN) {
	throw new Error('BOT_TOKEN is not defined')
}

const disposableSet = new Set(disposableDomains)

const emailSchema = z
	.email('Неверный формат почты')
	.refine(email => {
		const domain = email.split('@')[1] as string
		return !disposableSet.has(domain)
	}, 'Использование одноразовых почт запрещено')

const bot = new Bot<ConversationFlavor<Context>>(BOT_TOKEN)

bot.use(conversations())

bot.command('login', async (ctx) => {
	await ctx.reply('Soon...')
})

bot.command(['start', 'help'], async ctx => {
	await ctx.reply(
		'Hello! I am a bot for Aternos! \nType: \n/login to login to Aternos \n/run to run the server'
	)
})

bot.command('run', async ctx => {
	const loading = await ctx.reply('Running server...')

	setTimeout(() => {
		ctx.deleteMessages([loading.message_id])
		ctx.reply('Server is running! (no)')
	}, 2000)
})

export async function runBot() {
	await bot.init()

	bot.start()

	return bot
}
