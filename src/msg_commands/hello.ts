import { ChannelType, Client, Message } from "discord.js";
import axios from "axios";

export const passCondition = (message: Message) => {
  return message.content.toLowerCase().includes("hello");
};

export const execute = async (message: Message, client: Client) => {
  message.channel.send("**what's up**");
  const channel = client.channels.cache.get("1037163543096733768");

  if (!channel) return;
  if (channel.type !== ChannelType.GuildText) return;
  channel.messages.fetch({ limit: 100 }).then((messages) => {
    console.log(`Received ${messages.size} messages`);
    //Iterate through the messages here with the variable "messages".
    messages.forEach(async (message) => {
      const dataUrl = message.attachments.map((attachment) => {
        return attachment.url;
      });
      console.log(dataUrl);
      const data = await axios.get(dataUrl[0]);
      console.log(data);
    });
  });

  if (!message.mentions.members) return;
  // get  channel name
  // DMChannel
  if (message.channel.type === ChannelType.DM) return;
  const channelName = message.channel?.name;
  console.log(channelName);
};
