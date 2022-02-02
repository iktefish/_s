import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const eventList = [
  "ready",
  "shardReconnecting",
  "shardDisconnect",
  "messageCreate",
  "object",
];

const commandList = ["!object"];

client.on(eventList[0], () => {
  console.log(client.user.tag + "\n" + "===============READY===============");
});

client.on(eventList[1], () => {
  console.log("Bot is reconneting ...");
});

client.on(eventList[2], () => {
  console.log("Bot has been disconnected ...");
});

client.on("messageCreate", async (msg) => {
  // if (msg.content === "!object") {
  //   console.log(msg);
  // }
  let msgToLower = msg.content.toLowerCase();

  if (msgToLower === commandList[0] && msg.author.bot === false) {
    console.log(msg.channel);
    client.channels.cache
      .get("881899089875337258")
      .send("Art thee, who invoketh thine !object command?");
    console.log("Channel name ~~> ", msg.channel.name);
    console.log("Server name ~~> ", msg.channel.guild.name);
  }
});

client.login(process.env.TOKEN);
