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
  onStart: async function ({ message }) {
    const botName = "🎀𝐘𝐨𝐮𝐫 𝐌𝐨𝐦𝐨";
    const botPrefix = "+";
    const authorName = "A Dil";
    const ownAge = "15";
    const teamName = "Github team";
    const authorFB = "https://www.facebook.com/a.dil.605376?mibextid=ZbWKwL";
    const authorInsta = "https://www.instagram.com/a_dil2642/profilecard/?igsh=dmU5aW92eGh6MWxo";
    const tikTok = "";
    const urls = JSON.parse(fs.readFileSync('cliff.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];
    const now = moment().tz('Asia/Jakarta');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    message.reply({
      body: `《  Bot & Owner Info 》
\Name: ${botName}
\Bot Prefix: ${botPrefix}
\owner: ${authorName}
\age : ${ownAge}
\Facebook: ${authorFB}
\Instagram: ${authorInsta}
\TikTok: ${tikTok}
\Datee: ${date}
\Time: ${time}
\Team: ${teamName}
\Uptime: ${uptimeString}
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