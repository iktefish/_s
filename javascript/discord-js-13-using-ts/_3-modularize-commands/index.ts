import DiscordJS, { Intents, Message } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", () => {
    console.log(client.user?.tag, "=============== READY ===============")
})

client.login(process.env.TOKEN)
