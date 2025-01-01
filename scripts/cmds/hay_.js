module.exports = {
  config: {
    name: "hay?",
    aliases: ["how"],
    author: "ADIL",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says I am fine to the user."
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
    api.sendMessage("I am fine", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "how are you?" || event.body.toLowerCase() === "what about you?")) {
      message.reply("𝕀 𝕒𝕞 𝕗𝕚𝕟𝕖😊");
    }
  }
};