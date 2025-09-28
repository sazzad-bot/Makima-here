const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const https = require("https");
const fs = require("fs");
const path = require("path");

const GIF_URL = "https://i.imgur.com/FSmt4Yc.gif";
const GIF_PATH = path.join(__dirname, "help.gif");

// Simple fuzzy search for suggestion
function getClosestCommand(name) {
  const lowerName = name.toLowerCase();
  let closest = null;
  let minDist = Infinity;

  for (const cmdName of commands.keys()) {
    const dist = levenshteinDistance(lowerName, cmdName.toLowerCase());
    if (dist < minDist) {
      minDist = dist;
      closest = cmdName;
    }
  }

  if (minDist <= 3) return closest;
  return null;
}

// Levenshtein distance function (edit distance)
function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  return matrix[b.length][a.length];
}

// Convert text to aesthetic ᴇɪ ғᴏɴʀ style
function toAesthetic(text) {
  if (!text) return "";
  const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const aesthetic = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢᴬᴮᶜᴰᴱꜰᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂXʸᶻ0¹²³⁴⁵⁶⁷⁸⁹";
  return text
    .split("")
    .map((c) => {
      const index = normal.indexOf(c);
      return index !== -1 ? aesthetic[index] : c;
    })
    .join("");
}

module.exports = {
  config: {
    name: "help5",
    version: "1.25",
    author: "sᴀᴢᴢᴀᴅ_🐢",
    countDown: 5,
    role: 0,
    shortDescription: { en: "View command usage and list all commands directly" },
    longDescription: { en: "View command usage and list all commands directly" },
    category: "info",
    guide: { en: "{pn} / help [category] or help commandName" },
    priority: 1,
  },

  onStart: async function ({ message, args, event, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);

    const categories = {};
    for (const [name, value] of commands) {
      if (!value?.config || typeof value.onStart !== "function") continue;
      if (value.config.role > 1 && role < value.config.role) continue;

      const category = value.config.category?.toLowerCase() || "uncategorized";
      if (!categories[category]) categories[category] = [];
      categories[category].push(name);
    }

    const rawInput = args.join(" ").trim();
    let msg = "";

    if (!rawInput) {
      // Full help menu with aesthetic font
      msg += "╔═ ✨ᴍᴀᴋɪᴍᴀ ʜᴇʟᴘ ᴍᴇɴᴜ✨ ═╗\n\n";

      for (const category of Object.keys(categories).sort()) {
        const cmdList = categories[category];
        msg += `┍━━━[ 📁 ${toAesthetic(category.toUpperCase())} ]\n`;
        const sortedNames = cmdList.sort((a, b) => a.localeCompare(b));
        for (const cmdName of sortedNames) {
          msg += `┋〄 ${toAesthetic(cmdName)}\n`;
        }
        msg += "┕━━━━━━━━━━━━◊\n";
      }

      msg += "📌 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅꜱ: " + commands.size + "\n";
      msg += "🔑 ᴘʀᴇꜰɪx: " + prefix + "\n";
      msg += "👑 ᴏᴡɴᴇʀ: sᴀᴢᴢᴀᴅ_🐢";
    } else {
      const commandName = rawInput.toLowerCase();
      const command =
        commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command || !command?.config) {
        const suggestion = getClosestCommand(commandName);
        if (suggestion) {
          return message.reply(
            `❌ Command "${commandName}" not found.\n👉 Did you mean: "${suggestion}"?`
          );
        } else {
          return message.reply(
            `❌ Command "${commandName}" not found.\nTry: /help or /help [category]`
          );
        }
      }

      const configCommand = command.config;
      const roleText = roleTextToString(configCommand.role);
      const author = configCommand.author || "sᴀᴢᴢᴀᴅ_🐢";
      const longDescription =
        configCommand.longDescription?.en || "No description available.";
      const guideBody = configCommand.guide?.en || "No guide available.";
      const usage = guideBody.replace(
        /{pn}/g,
        `${prefix}${configCommand.name}`
      );

      msg += `  ╔════ [ ᴄᴏᴍᴍᴀɴᴅ ɪɴꜰᴏ ] ════╗
 ┋🧩 ɴᴀᴍᴇ : ${toAesthetic(configCommand.name)}
 ┋🗂️ ᴄᴀᴛᴇɢᴏʀʏ : ${toAesthetic(configCommand.category || "Uncategorized")}
 ┋📜 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ: ${toAesthetic(longDescription)}
 ┋🔁 ᴀʟɪᴀꜱᴇꜱ : ${command.config.aliases ? toAesthetic(command.config.aliases.join(", ")) : "None"}
 ┋⚙️ ᴠᴇʀꜱɪᴏɴ : ${configCommand.version || "1.0"}
 ┋🔐 ᴘᴇʀᴍɪꜱꜱɪᴏɴ : ${configCommand.role} (${toAesthetic(roleText)})
 ┋⏱️ ᴄᴏᴏʟᴅᴏᴡɴ : ${configCommand.countDown || 5}s
 ┋👑 ᴀᴜᴛʜᴏʀ : ${toAesthetic(author)}
 ┋📖 ᴜꜱᴀɢᴇ : ${toAesthetic(usage)}
 ╚═══════════════════╝`;
    }

    if (!fs.existsSync(GIF_PATH)) {
      await downloadGif(GIF_URL, GIF_PATH);
    }

    return message.reply({ body: msg, attachment: fs.createReadStream(GIF_PATH) });
  }
};

// Helper to convert role number to text
function roleTextToString(role) {
  switch (role) {
    case 0:
      return "All users";
    case 1:
      return "Group Admins";
    case 2:
      return "Bot Admins";
    default:
      return "Unknown";
  }
}

// Download gif if not exists
function downloadGif(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
          }
