module.exports = {
  config: {
    name: "goodmorning",
    aliases: ["gdmorning"],
    author: "Adil Hasan",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says good morning to the user."
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
    api.sendMessage("Good morning 🌄🌞", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "good morning" || event.body.toLowerCase() === "goodmorning")) {
      message.reply("𝔾𝕠𝕠𝕕 𝕞𝕠𝕣𝕟𝕚𝕟𝕘 🌄 🌞, ℍ𝕠𝕨 𝕒𝕣𝕖 𝕪𝕠𝕦?💕");
    }
  }
};