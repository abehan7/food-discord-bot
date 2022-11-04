import axios from "axios";
import { Collection, Message } from "discord.js";
import { IReview } from "../interfaces";

export const getFoodJsonData = async (
  messages: Collection<string, Message<true>>
): Promise<IReview[] | undefined> => {
  try {
    for (const message of messages.values()) {
      const dataUrl = message.attachments.map((attachment) => attachment.url);
      const { data } = await axios.get(dataUrl[0]);
      return data as IReview[];
    }
  } catch (error: any) {
    console.error(error);
    return [];
  }
};
