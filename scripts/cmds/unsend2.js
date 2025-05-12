module.exports = {
	config: {
		name: "unsend2",
                aliases: ["u2"],
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Gỡ tin nhắn của bot (có thể hẹn giờ)",
			en: "Unsend bot's message (with optional timer)"
		},
		category: "box chat",
		guide: {
			vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn} [thời gian (giây)]\nVí dụ: {pn} 10 (sẽ gỡ tin nhắn sau 10 giây)",
			en: "reply the message you want to unsend and call the command {pn} [time (seconds)]\nExample: {pn} 10 (will unsend the message after 10 seconds)"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot",
			invalidTime: "Thời gian phải là một số dương",
			scheduledUnsend: "Đã lên lịch gỡ tin nhắn sau %1 giây"
		},
		en: {
			syntaxError: "Please reply the message you want to unsend",
			invalidTime: "Time must be a positive number",
			scheduledUnsend: "Scheduled to unsend message after %1 seconds"
		}
	},

	onStart: async function ({ message, event, api, args, getLang }) {
		if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID())
			return message.reply(getLang("syntaxError"));

		const time = parseInt(args[0]);
		
		if (isNaN(time) || time <= 0) {
			if (args[0]) // If time argument exists but is invalid
				return message.reply(getLang("invalidTime"));
			// If no time argument, unsend immediately
			return message.unsend(event.messageReply.messageID);
		}

		message.reply(getLang("scheduledUnsend", time));
		
		setTimeout(() => {
			message.unsend(event.messageReply.messageID).catch(err => {
				console.error("Failed to unsend message:", err);
			});
		}, time * 1000);
	}
};
