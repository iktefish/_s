import DiscordJS, { Intents, Message } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", () => {
    console.log(client.user?.tag, "\n=============== READY ===============\n")
})

client.on("messageCreate", (message: Message) => {
    if (message.content === "whats up bots!") {
        message.reply({
            content: "Nothing much, just came to life!",
        })
    }
})

client.login(process.env.TOKEN)
