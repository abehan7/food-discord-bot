import { Client, GatewayIntentBits, Partials } from "discord.js";
import config from "../config";
import * as msgCommandModules from "../msg_commands";

const msgCommands = Object(msgCommandModules);
const msgCommandsNames = Object.keys(msgCommands);

export const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once("ready", () => console.log("Discord bot Ready!"));

client.on("messageCreate", async (message) => {
  try {
    // message.channel.send("hello");
    msgCommandsNames.map((commandName) => {
      msgCommands[commandName].passCondition(message) &&
        msgCommands[commandName].execute(message);
    });
  } catch (error: any) {
    console.error(error);
  }
});

client.login(config.DISCORD_TOKEN);
