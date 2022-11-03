import { ChannelType, Message } from "discord.js";

export const passCondition = (message: Message) => {
  return message.content.toLowerCase().includes("hello");
};

export const execute = async (message: Message) => {
  message.channel.send("**what's up**");
  if (!message.mentions.members) return;
  // get  channel name
  // DMChannel
  if (message.channel.type === ChannelType.DM) return;
  const channelName = message.channel?.name;
  console.log(channelName);
};
