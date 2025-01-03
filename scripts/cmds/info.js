const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "A Dil",
    countDown: 20,
    role: 0,
    shortDescription: { vi: "", en: "Show bot info" },
    longDescription: { vi: "", en: "Show bot info. Show bot details" },
    category: "owner",
    guide: { en: "+info" },
    envConfig: {}
  },
  onStart: async function ({ message, event, usersData }) {
    const botName = "⋆˚🦋ʸᵒᵘʳ𝙼𝚊𝚔𝚒𝚖𝚊🎀🍓⋆˚";
    const botPrefix = "+";
    const authorName = "A Dil";
    const ownAge = "15";
    const teamName = "Github team";
    const authorFB = "https://www.facebook.com/a.dil.605376?mibextid=ZbWKwL";
    const authorInsta = "https://www.instagram.com/a_dil2642/profilecard/?igsh=dmU5aW92eGh6MWxo";
    const tikTok = "";
    const urls = JSON.parse(fs.readFileSync('cliff.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];
    const now = moment().tz('Asia/dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    var id1 = event.senderID;
    var name1 = await usersData.getName(id1);
    message.reply({
      body: ` ➠${name1}
	  《  📌𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨 》
\🌸𝑵𝒂𝒎𝒆: ${botName}
\📎𝑩𝒐𝒕 𝑷𝒓𝒆𝒇𝒊𝒙: ${botPrefix}
\👑𝑶𝒘𝒏𝒆𝒓: ${authorName}
\👦🏻𝑨𝒈𝒆 : ${ownAge}
\📱𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌: ${authorFB}
\🅾𝑰𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎: ${authorInsta}
// \🐔𝑻𝒊𝒌𝑻𝒐𝒌: ${tikTok} //for tik tok add
\📅𝑫𝒂𝒕𝒆: ${date}
\🕔𝑻𝒊𝒎𝒆: ${time}
\🚀𝑻𝒆𝒂𝒎: ${teamName}
\⌛𝑼𝒑𝒕𝒊𝒎𝒆: ${uptimeString}
\===============`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};