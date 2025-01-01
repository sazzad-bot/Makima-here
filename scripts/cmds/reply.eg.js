module.exports = {
  config: {
    name: "",
    aliases: [""],
    author: "",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says to the user."
    },
    longDescription: {
      en: "Responds with a to the user invoking the command."
    },
    category: "general",
    guide: {
      en: "Just use the command and the bot will you!"
    }
  },
  event: null,
  onStart: async function ({ api, event }) {
    api.sendMessage("", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "" || event.body.toLowerCase() === "")) {
      message.reply("");
    }
  }
};