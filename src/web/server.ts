import { webhookCallback } from 'grammy'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'

import bot, { BOT_TOKEN } from '@/bot/bot.js'

const app = new Hono()

if (process.env.WEBHOOK === 'true') {
	app.post(`/${BOT_TOKEN}`, webhookCallback(bot, 'hono'))
} else if (process.env.NODE_ENV === 'production') {
	console.warn(
		'WEBHOOK environment variable is not set to "true". The bot will not be set up to receive updates via webhook.'
	)
}

app.get('/health', c => {
	const health = {
		status: 'ok',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
		env: process.env.NODE_ENV || 'development',
		version: process.env.npm_package_version,

		bot: {
			username: bot.botInfo.username,
			first_name: bot.botInfo.first_name,
			id: bot.botInfo.id,
		},
	}

	return c.json(health, 200)
})

export async function startServer() {
	return serve({
		fetch: app.fetch,
		port: process.env.PORT ? parseInt(process.env.PORT) : 3000
	})
}