module.exports = {
  config: {
    name: "cat",
    aliases: ["cutecat"],
    version: "1.0",
    author: "ADIL",
    countDown: 0,
    role: 0,
    shortDescription: "send you pic of cat",
    longDescription: "sends you pic of cute cat ",
    category: "image",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
   var link = [ 
        "https://imgur.com/IRJ8xBF.jpg",
        "https://imgur.com/5qHlPds.jpg",
        "https://imgur.com/5qHlPds.jpg",
        "https://imgur.com/6CIzIqX.jpg",
        "https://imgur.com/RZJ2Tnc.jpg",
        "https://imgur.com/6J1QILi.jpg",
        "https://imgur.com/A5lsQcH.jpg",
        "https://imgur.com/LXPACXg.jpg",
        "https://imgur.com/dQy1qRP.jpg",
        "https://imgur.com/FxzNSf9.jpg",
        "https://imgur.com/BTUynCk.jpg",
        "https://imgur.com/43u1wZK.jpg",
        "https://imgur.com/6gLfQ08.jpg",
        "https://imgur.com/vjYzItmv.jpg",
        "https://imgur.com/cnMsmNB.jpg",
        "https://imgur.com/jNqFKq3.jpg",
        "https://imgur.com/g1RQJ7y.jpg",
        "https://imgur.com/OzlCkPs.jpg",
        "https://imgur.com/M5kgx4Z.jpg",
        "https://imgur.com/qPrMFyD.jpg",
        "https://imgur.com/VU1zL2D.jpg",
        "https://imgur.com/HkqhZiX.jpg",
        "https://imgur.com/Evi8371.jpg",
        "https://imgur.com/JtqWGuK.jpg",
        "https://imgur.com/JtqWGuK.jpg",
        "https://imgur.com/MQTz5JG.jpg",
        "https://imgur.com/2WUFPuP.jpg",     
        "https://imgur.com/bRTgH2p.jpg",
        "https://imgur.com/aMI95La.jpg",
        "https://imgur.com/2jS13kC.jpg",
        "https://imgur.com/UMpFsqJ.jpg",
        "https://imgur.com/u1ikiQ0.jpg",
        "https://imgur.com/HGB4wyv.jpg",
        "https://imgur.com/undefined.jpg",
        "https://imgur.com/fuHM59r.jpg",
        "https://imgur.com/3H2Yv8U.jpg",
        "https://imgur.com/AtWmr5i.jpg",
        "https://imgur.com/XvQAmGp.jpg",
        "https://imgur.com/XTWc6b3.jpg",
]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 𝐂𝐮𝐭𝐢𝐞💗 𝐂𝐚𝐭🐱 」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }