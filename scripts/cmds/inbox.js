module.exports = {
  config: {
    name: "inbox",
    version: "1.6",
    author: "Mah MUD",
    countDown: 5,
    role: 0,
    category: "system"
  },

  // Used when invoked with a prefix (e.g., "!inbox")
  onStart: async function ({ event, api, args }) {
    const { mentions, threadID, senderID } = event;

    let targetID = senderID;
    let targetName = "baby";

    const mentionIDs = Object.keys(mentions);
    if (mentionIDs.length > 0) {
      targetID = mentionIDs[0];
      targetName = mentions[targetID].replace("@", "").trim();
    }

    // Send confirmation in group chat
    await api.sendMessage(`📨 ${targetName}, check your inbox! 💌`, threadID);

    // Try to send DM
    try {
      await api.sendMessage(
        `💖 Hi ${targetName}! You've got a sweet message from the bot. 🥰`,
        targetID
      );
    } catch (err) {
      console.error("❌ Failed to send inbox (prefix):", err);
      await api.sendMessage(
        `⚠️ Couldn't send inbox to ${targetName}. Maybe they haven't messaged the bot yet.`,
        threadID
      );
    }
  },

  // Used when no prefix is included (natural text match)
  onChat: async function ({ event, api }) {
    const { body, mentions, threadID, senderID } = event;

    if (!body) return;
    const messageText = body.toLowerCase().trim();

    if (messageText.startsWith("inbox")) {
      let targetID = senderID;
      let targetName = "baby";

      const mentionIDs = Object.keys(mentions);
      if (mentionIDs.length > 0) {
        targetID = mentionIDs[0];
        targetName = mentions[targetID].replace("@", "").trim();
      }

      await api.sendMessage(`📨 ${targetName}, check your inbox! 💌`, threadID);

      try {
        await api.sendMessage(
          `💖 Hi ${targetName}! You've got a sweet message from the bot. 🥰`,
          targetID
        );
      } catch (error) {
        console.error("❌ Failed to send inbox (no prefix):", error);
        await api.sendMessage(
          `⚠️ Couldn't send inbox to ${targetName}. Maybe they haven't messaged the bot yet.`,
          threadID
        );
      }
    }
  }
};
