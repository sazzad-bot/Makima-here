module.exports = {
  config: {
    name: "bye",
    aliases: ["by", "bye bye"],
    author: "Adil Hasan",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says bye to the user."
    },
    longDescription: {
      en: "Responds with a greeting to the user invoking the command."
    },
    category: "general",
    guide: {
      en: "Just use the command and the bot will greet you!"
    }
  },
  event: null,
  onStart: async function ({ api, event }) {
    api.sendMessage("Bye👋, See you later😊", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "bye" || event.body.toLowerCase() === "by" || event.body.toLowerCase() === "good bye" || event.body.toLowerCase() === "good by")) {
      message.reply("𝔹𝕪𝕖👋, 𝕊𝕖𝕖 𝕪𝕠𝕦 𝕝𝕒𝕥𝕖𝕣😊");
    }
  }
};