import { SlashCommandBuilder } from "@discordjs/builders";
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

    for (const food of foodJsonData) {
      const thread = await generalChannel.threads.create({
        name: `${food.id}_${food.name}`,
        autoArchiveDuration: 60,
        reason: "food thread",
      });
      // 이미지 전체 다 보내주는 로직
      const imgEmbeds = food.photo_urls.map((x) => {
        const embed = new EmbedBuilder();
        embed.setImage(x);
        return embed;
      });
      // 이거는 첫번째 사진만 보내주는 로직
      const embeds = [new EmbedBuilder().setImage(food.photo_urls[0])];
      await generalChannel.send({ embeds });
      const embed = new EmbedBuilder()
        .setTitle(`${food.id}-${food.name}`)
        .setDescription(food.text);
      await thread.send({ embeds: [embed, ...imgEmbeds] });
    }

    return interaction.reply("create-thread!");
  } catch (error: any) {
    console.error(error);
    return interaction.reply("Error!");
  }
}
