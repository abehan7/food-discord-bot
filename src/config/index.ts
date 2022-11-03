import dotenv from "dotenv";
dotenv.config();

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN) {
  throw new Error("Missing environment variables");
}

interface IConfig {
  CLIENT_ID: string;
  GUILD_ID: string;
  DISCORD_TOKEN: string;
}

const config: IConfig = { CLIENT_ID, GUILD_ID, DISCORD_TOKEN };

export default config;
