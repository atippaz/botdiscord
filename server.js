const { Client, GatewayIntentBits,Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});
const commandPrefix = '!'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // ไม่ตอบกลับถ้าข้อความเป็นของบอท

  // แสดงข้อความที่ผู้ใช้พิมพ์ในคอนโซล
  if(message.content.includes('!call')){
    const regex = /!call\s+<@(\d+)>\s+(\d+[ts])\s+(\d+[ts])\s+(.+)/;
  const match = message.content.match(regex);

  if (match) {
    const userId = match[1];
    const firstValue = match[2].replace(/[^0-9]/g, '');
    const secondValue = match[3].replace(/[^0-9]/g, '');
    const text = match[4];
    message.reply(`เรียก<@${userId}> และ ${firstValue}ครั้ง และ เรียกทุก${secondValue}วินาที`);
    let times = 0
    const inti = setInterval(() => {
      if(times == firstValue){
        clearInterval(inti)
        console.log('clear intival');
        message.reply(`success ${message.author.tag}`)
      }
      else{
        message.channel.send(`<@${userId}> ${text}`)
        times++    
      }
    }, secondValue*1000);
    return
  }
  }
  console.log(`ข้อความจาก ${message.author.tag}: ${message.content}`);
  message.reply('hi sir')
});

client.login(process.env.BOT_TOKEN);
