import { Client, GatewayIntentBits, Partials } from "discord.js";
import config from "../config";
import * as commandModules from "../commands";

const commands = Object(commandModules);

const client = new Client({
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  // channel.guild.members.cache.get(discord_id);
  console.log(commandName);
  await commands[commandName].execute(interaction, client);
});
client.login(config.DISCORD_TOKEN);
