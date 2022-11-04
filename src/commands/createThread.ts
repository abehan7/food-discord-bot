import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import {
  ChannelType,
  Client,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { getFoodJsonData } from "../utils";

export const data = new SlashCommandBuilder()
  .setName("create_thread")
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
    // console.log(generalChannel);

    foodJsonData.forEach((food) => {
      // make thread by food name
      generalChannel.threads
        .create({
          name: food.name,
          autoArchiveDuration: 60,
          reason: "food thread",
        })
        .then((thread) => {
          // send embed
          const embed = new EmbedBuilder()
            .setTitle(food.name)
            .setDescription(food.text)
            .setImage(food.photo_urls[0]);
          thread.send({ embeds: [embed] });
        });
    });
    // const name = foodJsonData[1].name.replace(/ /g, "_");

    return interaction.reply("create-thread!");
  } catch (error: any) {
    console.error(error);
    return interaction.reply("Error!");
  }
}
