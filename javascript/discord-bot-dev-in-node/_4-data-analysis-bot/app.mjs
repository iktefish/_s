import DiscordJS, { Client, Intents } from "discord.js"
import dotenv from "dotenv"
import dateTime from "node-datetime"

dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", () => {
    console.log(client.user.tag, "\n=============== READY ===============\n")
})

client.on("messageCreate", async (msg) => {
    if (msg.content === "!showserverinfo") {
        console.log("msg.guildID ~~> ", msg.guildId)
        console.log("msg.guild ~~> ", msg.guild)
    }

    if (msg.content === "!showauthorinfo") {
        console.log("msg.author.username ~~> ", msg.author.username)
        console.log("msg.author.discriminator ~~> ", msg.author.discriminator)
        console.log("msg.author.bot ~~> ", msg.author.bot)
    }

    if (msg.content === "!showchannelinfo") {
        console.log("msg.channel ~~> ", msg.channel)
        console.log("msg.channel.name ~~> ", msg.channel.name)
        console.log("msg.channelID ~~> ", msg.channelID)
    }
    // else if (msg.content.includes("") && msg.author.bot === false) {
    //   msg.reply("You are too young for this channel kid. It's 18+!");
    // }

    if (msg.content === "!showwhencreated") {
        console.log(
            "msg.channel.createdTimestamd ~~> ",
            msg.channel.createdTimestamp
        )
        let dateOfCreation = new Date(msg.channel.createdTimestamp)
        dateOfCreation.toString()
        console.log("dateOfCreatiion ~~>", dateOfCreation)

        let dateOfCreation_1 = dateTime.create(dateOfCreation)
        let formattedDateOfCre = dateOfCreation_1.format("m/d/Y H:M:S")
        console.log("formattedDateOfCre ~~> ", formattedDateOfCre)
    }

    if (msg.content === "!showserverage") {
        let currentDate = Date.now()
        console.log("currentDate ~~> ", currentDate)

        let dateOfCreation = new Date(msg.channel.createdTimestamp)
        let dateDelta = currentDate - dateOfCreation

        let ageOfSever = dateDelta / (1000 * 60 * 60 * 24)
        console.log("ageOfServer ~~> ", ageOfSever, "days")
        msg.reply("This server is " + Math.floor(ageOfSever) + " years old!")
    }
})

client.login(process.env.TOKEN)
