import { config as dotenvconfig } from "dotenv";
dotenvconfig();

import { AttachmentBuilder, Client, Events, GatewayIntentBits, Message } from "discord.js";

const intents: GatewayIntentBits[] = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent];
const client = new Client({ intents });

const prefix = ";"

client.on(Events.ClientReady, (c) => {
  console.log(`Successfully logged in as ${c.user.username}`);
})

client.on(Events.MessageCreate, async (message: Message) => {

  if (message.author.bot || !message.content.startsWith(prefix))
    return;

  const args = message.content.slice(prefix.length).split(" ");
  const cmd = args.shift()?.toLowerCase();

  switch (cmd) {
    case "gifify":
      {

        const attachments = message.attachments;

        const images = message.attachments.filter(att =>
          att.contentType?.startsWith("image/")
        );

        const files = images.map(img =>
          new AttachmentBuilder(img.url, { name: `${img.name}.gif` })
        );

        message.reply({
          files
        })
      }
  }
});

client.login(process.env.TOKEN);