import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("The bot's ready!");
});

client.on("messageCreate", (message) => {
  if (message.content === "whats up bots!") {
    message.reply({
      content: "Nothing much, just came to life!",
    });
  }
});

client.login(process.env.TOKEN);
