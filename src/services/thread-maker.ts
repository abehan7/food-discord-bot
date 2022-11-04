import { Client, GatewayIntentBits, Partials, TextChannel } from "discord.js";
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
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once("ready", () => console.log("Discord bot Ready!"));

client.on("threadCreate", async (thread) => {
  try {
    if (thread.guildId !== "1036434965770014810") {
      return;
    }
    thread.guild?.channels
      .fetch("1036436067022282852")
      .then(async (channel) => {
        if (!(channel instanceof TextChannel)) {
          return; // テキストチャンネルのメッセージではない
        }
        const channelId = thread.parent?.id;
        const threadName = thread.name;
        const threadId = thread.id;
        const threadOwner = await thread.fetchOwner();

        channel
          .send(
            `<#${channelId}> -> \`${threadName}\` (<#${threadId}>) が \`${threadOwner?.user?.tag}\` によって作成されました。`
          )
          .then(() => {
            console.log("posted created thread message");
          });
      });
  } catch (error: any) {
    console.error(error);
  }
});

client.login(config.DISCORD_TOKEN);
