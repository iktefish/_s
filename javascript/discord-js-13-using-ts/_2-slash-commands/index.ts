import DiscordJS, { Intents, Interaction, Message } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", () => {
    console.log(client.user?.tag, "\n=============== READY ===============\n")

    const guildId = "879212507925995540"
    // console.log("guildID ~~> ", guildId)
    const guild = client.guilds.cache.get(guildId)
    // console.log("guild ~~> ", guild)

    let commands
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: "howdy",
        description: "HOLA!!!",
    })

    commands?.create({
        name: "sumof",
        description: "Adds two numbers pass in parameters",
        options: [
            {
                name: "arg1",
                description: "First argument",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: "arg2",
                description: "Second argument",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
    })
})

client.on("interactionCreate", (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === "howdy") {
        interaction.reply({
            content: "Nothin much maite!",
            ephemeral: false,
        })
    }
})

client.on("interactionCreate", (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === "sumof") {
        const arg1 = options.getNumber("arg1")
        const arg2 = options.getNumber("arg2")
        const ans = arg1! + arg2!

        interaction.reply({
            content: `The sum is ${ans}`,
            ephemeral: true,
        })
    }
})

client.on("messageCreate", (message: Message) => {
    if (message.content === "whats up bots!") {
        message.reply({
            content: "Nothing much, just came to life!",
        })
    }
})

client.login(process.env.TOKEN)
