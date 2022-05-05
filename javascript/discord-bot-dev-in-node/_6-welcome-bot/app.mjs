import DiscordJS, { Intents } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

let client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
})

client.on("ready", () => {
    console.log(client.user.tag, "\n=============== READY ===============\n")
})

client.login(process.env.TOKEN)
