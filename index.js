require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const prefix = '!';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
  console.log('The bot now online!');
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

          let conversationLog = [{ role: 'system', content: ' Shylily.' }];

              conversationLog.push({
              role: 'user',
              content: message.content,
              });

await message.channel.sendTyping();

        const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        })

    message.reply(result.data.choices[0].message);
}); 

client.login(process.env.BOT_TOKEN);
