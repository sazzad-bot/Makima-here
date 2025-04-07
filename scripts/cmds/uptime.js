const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

// Dynamic API URL fetcher from your first script
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Adil2641/D1PT0/refs/heads/main/baseApiUrl.json`
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "uptime",
    aliases: ["up", "upt"],
    version: "1.1",
    author: "Vex_kshitiz & Dipto",
    role: 0,
    shortDescription: {
      en: "Displays the bot's uptime."
    },
    longDescription: {
      en: "Find out how long the bot has been tirelessly serving you."
    },
    category: "owner",
    guide: {
      en: "Use {p}uptime to reveal the bot's operational duration."
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      // Makima-related queries
      const searchQueries = [
        "Makima cute pic",
        "Makima",
        "Chainsawman Couple",
        "Chainsawman Makima",
        "Makima anime latest pic"
      ];

      // Pick a random query
      const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];

      // Use dynamic base URL from GitHub
      const apiBase = await baseApiUrl();
      const apiUrl = `${apiBase}/pinterest?search=${encodeURIComponent(randomQuery)}&limit=10`;

      // Fetch images
      const response = await axios.get(apiUrl);
      const images = response.data.data;

      if (!images || images.length === 0) {
        return api.sendMessage("❌ No images found from Pinterest API.", event.threadID, event.messageID);
      }

      // Pick a random image
      const randomImage = images[Math.floor(Math.random() * images.length)];

      // Download and save the image
      const imageRes = await axios.get(randomImage, { responseType: "arraybuffer" });
      const imgFolder = path.join(__dirname, "cache");
      await fs.ensureDir(imgFolder);
      const imagePath = path.join(imgFolder, `uptime_${Date.now()}.jpg`);
      await fs.outputFile(imagePath, imageRes.data);

      // Calculate uptime
      const uptime = process.uptime();
      const days = Math.floor(uptime / (60 * 60 * 24));
      const hours = Math.floor((uptime / (60 * 60)) % 24);
      const minutes = Math.floor((uptime / 60) % 60);
      const seconds = Math.floor(uptime % 60);

      let uptimeString = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
      if (days === 0) {
        uptimeString = `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
        if (hours === 0) {
          uptimeString = `${minutes} minutes, and ${seconds} seconds`;
          if (minutes === 0) {
            uptimeString = `${seconds} seconds`;
          }
        }
      }

      // Send the message
      const msg = `𝐇𝐞𝐥𝐥𝐨 𝐌𝐚𝐬𝐭𝐞𝐫👑\n🤖 𝐓𝐡𝐞 𝐛𝐨𝐭 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐚𝐥𝐢𝐯𝐞 𝐟𝐨𝐫:\n⏱️ ${uptimeString}`;
      await api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(imagePath),
        },
        event.threadID,
        event.messageID
      );

      // Clean up
      await fs.unlink(imagePath);
    } catch (error) {
      console.error("Uptime command error:", error.message);
      return api.sendMessage("❌ An error occurred while fetching the uptime or image.", event.threadID, event.messageID);
    }
  }
};
