const { Client, GatewayIntentBits,Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});
const commandPrefix = '!'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});
client.on('guildCreate', (guild) => {
  console.log(`บอทเข้าร่วมเซิร์ฟเวอร์: ${guild.name}`);
  // ทำสิ่งที่คุณต้องการเมื่อบอทเข้าร่วมเซิร์ฟเวอร์ใหม่
});
client.on('messageCreate',async (message) => {
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
  if (message.content.includes('!shake') ) {
    message.reply('waiting . . .')

    const regex = /!shake\s+<@(\d+)>/;
    const match = message.content.match(regex);

  if (match) {
  message.reply('shaking . . .')

    const userId = match[1];
    const voiceStates = message.guild.voiceStates.cache.array();

    // ค้นหาผู้ใช้ที่ตรงกับ ID ใน voiceStates
    const userToMove = voiceStates.find((voiceState) => voiceState.member.id === userId);

    if (userToMove) {
      // ค้นหาชาแนลเสียงที่คุณต้องการย้ายผู้ใช้
      const voiceChannels = message.guild.channels.cache.filter((channel) => channel.type === 'GUILD_VOICE');

      if (voiceChannels.size > 1) {
        // ทำการย้ายผู้ใช้ไปยังชาแนลใหม่ 5 ครั้ง
        for (let i = 0; i < 10; i++) {
          const newChannel = voiceChannels.random();

          // ย้ายผู้ใช้ไปยังชาแนลใหม่
          await userToMove.setChannel(newChannel);

          // รอเวลาบางครู่
          await new Promise((resolve) => setTimeout(resolve, 500)); // รอ 5 วินาที

          // ย้ายผู้ใช้กลับไปยังชาแนลเดิม
          await userToMove.setChannel(userToMove.channel);
        }
      }
    } else {
      message.reply('ไม่พบผู้ใช้นี้ในห้องเสียง');
    }
  }
}
  
  console.log(`ข้อความจาก ${message.author.tag}: ${message.content}`);
  message.reply('hi sir')
});

client.login(process.env.BOT_TOKEN);
