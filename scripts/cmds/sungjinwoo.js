module.exports = {
  config: {
    name: "sungjinwoo",
    aliases: ["jinwoo",],
    version: "1.0",
    author: "ADIL",
    countDown: 5,
    role: 0,
    shortDescription: "send you pic of Sung Jin Woo ",
    longDescription: "sends you pic of Sung Jin Woo ",
    category: "image",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
   var link = [ 
     "https://imgur.com/wb6k4wq.jpg",
     "https://imgur.com/mz1yPih.jpg",
     "https://imgur.com/fFNl6W0.jpg",
     "https://imgur.com/1gknOU8.jpg",
     "https://imgur.com/LS2xqXt.jpg",
     "https://imgur.com/W7u1nLw.jpg",
     "https://imgur.com/KQjsXIg.jpg",
     "https://imgur.com/hhrwpvu.jpg",
     "https://imgur.com/qQ8pnqA.jpg",
     "https://imgur.com/QD9Ji4C.jpg",
     "https://imgur.com/N5DFQyF.jpg",
     "https://imgur.com/7A7Qf1i.jpg",
     "https://imgur.com/KEKcYmE.jpg",
     "https://imgur.com/5sunm0S.jpg",
     "https://imgur.com/YbCP7eE.jpg",
     "https://imgur.com/undefined.jpg",
     "https://imgur.com/wdY3L7o.jpg",
     "https://imgur.com/IoG20xA.jpg",
     "https://imgur.com/sS13kAo.jpg",
     "https://imgur.com/rR0mQSj.jpg",
     "https://imgur.com/undefined.jpg",
     "https://imgur.com/x8vznMj.jpg",
     "https://imgur.com/undefined.jpg",
     "https://imgur.com/undefined.jpg",
     "https://imgur.com/sdogcic.jpg",
     "https://imgur.com/mFsbK4d.jpg",
     "https://imgur.com/5WyN3TG.jpg",
     "https://imgur.com/R1ztCZp.jpg",
     "https://imgur.com/1dCmJlv.jpg",
     "https://imgur.com/undefined.jpg",
     "https://imgur.com/undefined.jpg",
     "https://imgur.com/undefined.jpg",
  ]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: ' 「╔════ஜ۩۞۩ஜ═══╗\n    𝕋𝕙𝕖 𝕓𝕠𝕤𝕤😎 𝕚𝕤    \n    𝕊𝕦𝕟𝕘 𝕁𝕚𝕟 𝕎𝕠𝕠🎇\n   ╚════ஜ۩۞۩ஜ═══╝」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }