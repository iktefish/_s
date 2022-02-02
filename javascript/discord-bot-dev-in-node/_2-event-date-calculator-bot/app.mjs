import DiscordJS, { Intents, Message } from "discord.js";
import dotenv from "dotenv";
import dateTime from "node-datetime";

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const eventList = [
  "ready",
  "shardReconnecting",
  "shardDisconnect",
  "messageCreate",
];

const commandList = ["!commands", "!events", "!authors"];
const replyList = [
  "Name: Ishrytan Lituaria",
  "Age: 3600",
  "From: Proxima Centauri",
];

// const eventDate = "2022-01-05 18:00:00";

const format = "m/d/y H:M";

const hourInMs = 3600000;
const minInMs = 60000;

client.on(eventList[0], () => {
  console.log(client.user.tag + "\n" + "=============== READY ===============");
});

client.on(eventList[1], () => {
  console.log("Bot is trying to reconnect ...");
});

client.on(eventList[2], () => {
  console.log("Bot is disconnecting ...");
});

client.on(eventList[3], async (msg) => {
  if (msg.content === commandList[0]) {
    msg.reply("This bot commands are: !commands !events !authors");
  } else if (msg.content === commandList[1]) {
    msg.reply("Please enter event date!\nFormat: ```2022-01-05 18:00:00```");
    client.on(eventList[3], async (msg) => {
      if (msg.content === "2022-01-05 18:00:00") {
        const eventDate = msg.content;
        console.log("eventDate ~~> ", eventDate);

        let nextEventDate = dateTime.create(eventDate);
        let nextEventDateMod = dateTime.create(eventDate);
        console.log("nextEventDate ~~> ", nextEventDate);
        console.log("nextEventDateMod ~~> ", nextEventDateMod);

        nextEventDateMod.offsetInHours(1);
        let formatNextEventDate = nextEventDate.format(format);
        let formatNextEventDateMod = nextEventDateMod.format(format);
        console.log("formatNextEventDate ~~> ", formatNextEventDate);
        console.log("formatNextEventDateMod ~~> ", formatNextEventDateMod);

        let dateCurrent = dateTime.create();
        let formatDateCurrent = dateCurrent.format(format);
        console.log("dateCurrent ~~> ", dateCurrent);
        console.log("formatDateCurrent ~~> ", formatDateCurrent);

        let dateCurrentInMs = new Date(formatDateCurrent);
        let nextEventInMs = new Date(formatNextEventDateMod);

        const dateDifference = nextEventInMs - dateCurrentInMs;

        // console.log(dateCurrentInMs + "\n" + nextEventDate);
        console.log("dateDifference ~~> ", dateDifference);

        msg.reply(formatNextEventDate);
      }
    });

  } else if (msg.content === commandList[2]) {
    msg.reply(replyList[0] + " " + replyList[1] + " " + replyList[2]);
  }
});

client.login(process.env.TOKEN);
