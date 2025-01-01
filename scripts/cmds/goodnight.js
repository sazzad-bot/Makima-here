module.exports = {
  config: {
    name: "goodnight",
    aliases: ["gdnight"],
    author: "Adil Hasan",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says good night to the user."
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
    api.sendMessage("Good night 🌉 😴, see you tomorrow", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "good night" || event.body.toLowerCase() === "goodnight")) 
    if (event.body && (event.body.toLowerCase() === "gd night" || event.body.toLowerCase() === "gdnight")){
      message.reply("𝔾𝕠𝕠𝕕𝕟𝕚𝕘𝕙𝕥😴,𝕊𝕖𝕖 𝕪𝕠𝕦 𝕥𝕠𝕞𝕠𝕣𝕣𝕠𝕨🙂💗");
    }
  }
};