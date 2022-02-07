import DiscordJS, { Intents } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", () => {
    console.log(client.user.tag, "\n=============== READY ===============\n")
})

client.on("messageCreate", async (msg) => {
    if (msg.content === "!embed") {
        const embed = new DiscordJS.MessageEmbed()
        embed.setTitle("Something (link here too ...)")
        embed.setDescription("Some description!")
        embed.setColor("#35763e")
        embed.setURL("https://github.com/iktefish")
        embed.setThumbnail(
            "https://cdna.artstation.com/p/assets/images/images/016/164/742/large/timur-dairbayev-squid-art.jpg?1551153085"
        )
        embed.setImage(
            "https://cdna.artstation.com/p/assets/images/images/016/164/742/large/timur-dairbayev-squid-art.jpg?1551153085"
        )
        embed.setTimestamp()
        // embed.setFooter(
        //   "Leg's here",
        //   "https://cdna.artstation.com/p/assets/images/images/016/164/742/large/timur-dairbayev-squid-art.jpg?1551153085"
        // );
        embed.addFields(
            {
                name: "Title of field",
                value: "Contents of field",
                inline: false,
            },
            {
                name: "\u200B",
                value: "\u200B",
                inline: false,
            },
            {
                name: "(1) Inline",
                value: "Inline description ...",
                inline: true,
            },
            {
                name: "(2) Inline",
                value: "Inline description ...",
                inline: true,
            },
            {
                name: "(3) Inline",
                value: "Inline description ...",
                inline: true,
            }
        )

        msg.reply({ embeds: [embed] })
        // msg.reply(embed)
    }
})

client.login(process.env.TOKEN)
