module.exports = {
  config: {
    name: "misti",
    aliases: ["mis","m"],
    version: "1.0",
    author: "ADIL",
    countDown: 5,
    role: 0,
    shortDescription: "send you pic of Misti's favourite item ",
    longDescription: "sends you pic of Misti's favourite is cute Baby and cute cat ",
    category: "image",
    guide: "{pn}"
  },
  
       onStart: async function ({ message }) {
        var link = [ 
          //cute cat pic
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
           //cute baby pic               
          "https://imgur.com/o54qFyd.jpg",
          "https://imgur.com/3ipRZZ7.jpg",
          "https://imgur.com/WOglioL.jpg",
          "https://imgur.com/SYpFGTT.jpg",
          "https://imgur.com/36vHSzh.jpg",
          "https://imgur.com/csJ10AA.jpg",
          "https://imgur.com/pYsJDmf.jpg",
          "https://imgur.com/fSDDntH.jpg",
          "https://imgur.com/r1e4HQZ.jpg",
          "https://imgur.com/laQcApw.jpg",
          "https://imgur.com/ZN4y6xJ.jpg",
          "https://imgur.com/uUPOECR.jpg",
          "https://imgur.com/rVkGTZm.jpg",
          "https://imgur.com/wTykist.jpg",
          "https://imgur.com/90fWynY.jpg",
]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: "「 💗𝕄𝕚𝕤𝕥𝕚'𝕤 𝕗𝕒𝕧𝕠𝕦𝕣𝕚𝕥𝕖  」",attachment: await global.utils.getStreamFromURL(img)
})
}
     }