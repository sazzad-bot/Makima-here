module.exports = {
  config: {
    name: "inbox",
    version: "1.0",
    author: "Mah MUD",
    countDown: 5,
    role: 0,
    category: "system" // Removed the trailing comma here
  },
  onStart: async function({ api, event, args, message }) {
    try {
      const query = encodeURIComponent(args.join(' '));
      message.reply("baby check your inbox", event.threadID);
      api.sendMessage("hi baby", event.senderID);
    } catch (error) {
      console.error("error baby: " + error);
    }
  }
};