module.exports = {
	config: {
		name: "blowjob",
		aliases: ["bj"],
		version: "1.0",
		author: "Sarkar",
    credit: "Upen",
		countDown: 5,
		role: 2,
		shortDescription: "send you pic of Nsfw",
		longDescription: "",
		category: "18+",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [
"https://imgur.com/T5NbyK0.jpg",
"https://imgur.com/jM9g6u8.jpg",
"https://imgur.com/Xi3OsqB.jpg",
"https://imgur.com/cDQtYN4.jpg",
"https://imgur.com/1qNLlud.jpg",
"https://imgur.com/x3XuwdZ.jpg",
"https://imgur.com/LuvmKnk.jpg",
"https://imgur.com/X0b6IXN.jpg",
"https://imgur.com/MSeahBG.jpg",
"https://imgur.com/7k6nCic.jpg",
"https://imgur.com/dazOPNB.jpg",
"https://imgur.com/V3N2GVQ.jpg",
"https://imgur.com/7eRHxpt.jpg",
"https://imgur.com/ntIIvox.jpg",
"https://imgur.com/xTRAOpK.jpg",
"https://imgur.com/rccLfZL.jpg",
"https://imgur.com/hbxkKSC.jpg",
"https://imgur.com/511K2hM.jpg",
"https://imgur.com/euoR3ou.jpg",
"https://imgur.com/7DmexJY.jpg",
"https://imgur.com/O2JntmX.jpg",
"https://imgur.com/XXumTdG.jpg",
"https://imgur.com/XthnhJy.jpg",
"https://imgur.com/ddYAInS.jpg",
"https://imgur.com/6Pnk1OD.jpg",
"https://imgur.com/LEL9Nc9.jpg",
"https://imgur.com/uKs2GJp.jpg",
"https://imgur.com/RkZwrAs.jpg",
"https://imgur.com/2OxyyR0.jpg",
"https://imgur.com/whRldjW.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 Daddy jerk off 💦🥵 」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }