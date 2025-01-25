const { loadImage, createCanvas } = require('canvas');
const fs = require('fs-extra');
const axios = require('axios');

const exampleModule = {
  config: {
    name: 'fbhack',
    aliases: ['hack'],
    author: 'authorName',
    countDown: 5,
    role: 2,
    category: 'Fun',
    shortDescription: { en: 'prank em' }
  },
  wrapText: async (context, text, maxWidth) => {
    return new Promise(resolve => {
      if (context.measureText(text).width < maxWidth) return resolve([text]);
      if (context.measureText('W').width > maxWidth) return resolve(null);

      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      while (words.length > 0) {
        let isWordTooLong = false;

        while (context.measureText(words[0]).width >= maxWidth) {
          const word = words[0];
          words[0] = word.slice(0, -1);
          if (isWordTooLong) words[1] = word.slice(-1) + words[1];
          else isWordTooLong = true;
          words.splice(1, 0, word.slice(-1));
        }

        if (context.measureText(currentLine + words[0]).width < maxWidth) {
          currentLine += words.shift() + ' ';
        } else {
          lines.push(currentLine.trim());
          currentLine = '';
        }

        if (words.length === 0) lines.push(currentLine.trim());
      }

      return resolve(lines);
    });
  },
  onStart: async function({ args, usersData, threadsData, api, event, message }) {
    const loadingMessages = ['Fetching FB Account Data...', 'Prank successful!', 'My Lord, Please Check Your Inbox.'];
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

    await message.send(`👽 ${randomMessage}`);
    
    let backgroundFilePath = __dirname + '/cache/background.png';
    let avatarFilePath = __dirname + '/cache/avatar.png';
    
    const userId = Object.keys(event.mentions)[0] || event.senderID;
    let userInfo = await api.getUserInfo(userId);
    userInfo = userInfo[userId].name;
    
    const avatarUrl = `https://graph.facebook.com/${userId}/picture?width=720&height=720&access_token=YOUR_ACCESS_TOKEN`;
    let avatarBuffer = (await axios.get(avatarUrl, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarFilePath, Buffer.from(avatarBuffer, 'utf-8'));
    
    const backgroundUrl = 'https://imgur.com/G8nF9jy.png'; // Example background image URL
    let backgroundBuffer = (await axios.get(backgroundUrl, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(backgroundFilePath, Buffer.from(backgroundBuffer, 'utf-8'));
    
    let backgroundImage = await loadImage(backgroundFilePath);
    let avatarImage = await loadImage(avatarFilePath);
    let canvas = createCanvas(backgroundImage.width, backgroundImage.height);
    let context = canvas.getContext('2d');
    
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    context.font = '400 23px Arial';
    context.fillStyle = '#1878F3';
    context.textAlign = 'center';
    
    const wrappedText = await this.wrapText(context, userInfo, 1160);
    context.fillText(wrappedText.join('\n'), 200, 241);
    
    context.beginPath();
    context.drawImage(avatarImage, 83, 437, 100, 100);
    
    const buffer = canvas.toBuffer();
    fs.writeFileSync(backgroundFilePath, buffer);
    fs.removeSync(avatarFilePath);
    
    api.sendMessage({ body: `✅ Successfully Hacked This User! My Lord, Please Check Your Inbox.\n\nFB Code: ${randomMessage}`, attachment: fs.createReadStream(backgroundFilePath) }, event.threadID, () => fs.unlinkSync(backgroundFilePath), event.messageID);
  }
};

module.exports = exampleModule;
