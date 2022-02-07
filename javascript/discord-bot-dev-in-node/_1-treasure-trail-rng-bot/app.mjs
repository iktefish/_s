import DiscordJS, { Intents } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", () => {
    console.log(client.user.tag, "\n=============== READY ===============\n")
})

client.on("messageCreate", (message) => {
    // user-input to lower case
    const usrInLower = message.content.toLowerCase()

    // random reward command
    if (usrInLower.includes("!command") && message.author.bot == false) {
        let decodedMessage = usrInLower.split(" ")
        let numFromMessage = Number(decodedMessage[1])
        let floorNum = Math.floor(numFromMessage)

        if (
            decodedMessage[0] == "!command" &&
            Number(floorNum) &&
            decodedMessage.length == 2 &&
            floorNum > 0 && // number of treasure chest drops
            floorNum < 10001
        ) {
            let rewardRolls = 0
            let totalWarriorGear = 0
            let totalSorcererGear = 0
            let totalRogueGear = 0

            for (let i = 0; i < floorNum; i++) {
                let rollsThisChest = Math.floor(Math.random() * 3) + 3
                console.log("rollsThisChest ~~> {}", rollsThisChest)
                rewardRolls = rewardRolls + rollsThisChest
            }

            for (let i = 0; i < rewardRolls; i++) {
                let rewardRoll = Math.floor(Math.random() * 1000) + 1
                // console.log("rewardRoll ~~~> {}", rewardRoll);
                if (rewardRoll === 333) {
                    totalWarriorGear = totalWarriorGear + 1
                } else if (rewardRoll === 666) {
                    totalSorcererGear++
                } else if (rewardRoll === 999) {
                    totalRogueGear++
                }
            }
            console.log("=============== Gear Found ===============")
            console.log("totalWarriorGear ~~> {}", totalWarriorGear)
            console.log("totalSorcererGear ~~> {}", totalSorcererGear)
            console.log("totalRogueGear ~~> {}", totalRogueGear)
            console.log("==========================================")
            console.log("===== Proper input caught =====")

            message.reply(
                "Warrior Gear: " +
                    totalWarriorGear +
                    "\nSorcerer Gear: " +
                    totalSorcererGear +
                    "\nRogue Gear: " +
                    totalRogueGear
            )
        } else {
            console.log("===== Wrong input caught =====")
        }

        console.log(floorNum)
    }
    // help command
    else if (usrInLower === "!help") {
        message.reply("To get random reward: !command")
    }
})

client.login(process.env.TOKEN)
