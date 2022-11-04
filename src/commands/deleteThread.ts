import { SlashCommandBuilder } from "@discordjs/builders";
import { ChannelType, Client, CommandInteraction } from "discord.js";
import { getFoodJsonData } from "../utils";

export const data = new SlashCommandBuilder()
  .setName("delete_thread")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction, client: Client) {
  try {
    const channel = client.channels.cache.get("1037163543096733768");
    const generalChannel = client.channels.cache.get("1036434965770014814");

    if (!channel || !generalChannel) return;
    if (channel.type !== ChannelType.GuildText) return;
    if (generalChannel.type !== ChannelType.GuildText) return;

    const messages = await channel.messages.fetch({ limit: 100 });
    const foodJsonData = (await getFoodJsonData(messages)) || [];

    for (const food of foodJsonData) {
      const thread = generalChannel.threads.cache.find(
        (x) => x.name === food.name
      );
      if (!thread) return;
      await thread.delete();
    }
    console.log("done");
    return interaction.reply("create-thread!");
  } catch (error: any) {
    console.error(error);
    return interaction.reply("Error!");
  }
}
