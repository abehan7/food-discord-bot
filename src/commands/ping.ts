import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import {
  ChannelType,
  Client,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get("1037163543096733768");

  if (!channel) return;
  if (channel.type !== ChannelType.GuildText) return;

  const messages = await channel.messages.fetch({ limit: 100 });
  console.log(`Received ${messages.size} messages`);
  //Iterate through the messages here with the variable "messages".
  const getFoodJsonData = async (): Promise<Object[] | undefined> => {
    try {
      for (const message of messages.values()) {
        const dataUrl = message.attachments.map((attachment) => attachment.url);
        const { data } = await axios.get(dataUrl[0]);
        return data as Object[];
      }
    } catch (error: any) {
      console.error(error);
      return [];
    }
  };
  const foodJsonData = await getFoodJsonData();
  if (foodJsonData) {
    console.log(foodJsonData);
    return interaction.reply("data searched!");
  }
  return interaction.reply("Pong!");
}
