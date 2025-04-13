const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const ytSearch = require("yt-search");

const CACHE_FOLDER = path.join(__dirname, "cache");

async function downloadAudio(videoId, filePath) {
    const url = `https://yt-dl-api-48r3.onrender.com/download?id=${videoId}`;
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

async function fetchAudioFromReply(api, event, message) {
    const attachment = event.messageReply.attachments[0];
    if (!attachment || (attachment.type !== "video" && attachment.type !== "audio")) {
        throw new Error("Please reply to a valid video or audio attachment.");
    }

    const shortUrl = attachment.url;
    const reconApi = `https://audio-recon-api.onrender.com/adil?url=${encodeURIComponent(shortUrl)}`;

    const audioRecResponse = await axios.get(reconApi);
    return {
        title: audioRecResponse.data.title,
        videoId: null
    };
}

async function fetchAudioFromQuery(query) {
    const searchResults = await ytSearch(query);
    if (searchResults && searchResults.videos && searchResults.videos.length > 0) {
        return {
            title: searchResults.videos[0].title,
            videoId: searchResults.videos[0].videoId
        };
    } else {
        throw new Error("No results found for the given query.");
    }
}

async function handleAudioCommand(api, event, args, message) {
    api.setMessageReaction("🕢", event.messageID, () => {}, true);

    try {
        let result;
        if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
            result = await fetchAudioFromReply(api, event, message);
            // If we got title from reply, now search YouTube for that title
            const searchData = await fetchAudioFromQuery(result.title);
            result.videoId = searchData.videoId;
            result.title = searchData.title; // Use the YouTube title instead
        } else if (args.length > 0) {
            const query = args.join(" ");
            result = await fetchAudioFromQuery(query);
        } else {
            message.reply("Please provide a query or reply to a valid video/audio attachment.");
            return;
        }

        const filePath = path.join(CACHE_FOLDER, `${result.videoId}.mp3`);
        await downloadAudio(result.videoId, filePath);

        const audioStream = fs.createReadStream(filePath);
        message.reply({ 
            body: `🎵 ${result.title}`,
            attachment: audioStream 
        });
        api.setMessageReaction("✅", event.messageID, () => {}, true);

    } catch (error) {
        console.error("Error:", error.message);
        message.reply("An error occurred while processing your request.");
        api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
}

module.exports = {
    config: {
        name: "song",
        version: "1.0",
        author: "ADIL",
        countDown: 10,
        role: 0,
        shortDescription: "Download and send audio from YouTube.",
        longDescription: "Download audio from YouTube based on a query or attachment.",
        category: "music",
        guide: "{p}audio [query] or reply to a video/audio attachment",
    },
    onStart: function ({ api, event, args, message }) {
        return handleAudioCommand(api, event, args, message);
    },
};
