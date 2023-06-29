module.exports = {
  name: "help",
  aliases: ["help"],
  run: async (client, message) => {
    try {
      const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
      const serverProf = new AttachmentBuilder(
        "../container/src/Pictures/newGalaxyServerProf.png"
      );
      const botProf = new AttachmentBuilder(
        "../container/src/Pictures/galaxyBotV3Prof.jpg"
      );

      const embed = new EmbedBuilder()
        .setAuthor({
          name: "Galaxy Bot V3",
          iconURL: "attachment://galaxyBotV3Prof.jpg",
        })
        .setTitle("A Galaxy Bot V3 Stancz Levente által készült.")
        .setThumbnail("attachment://newGalaxyServerProf.png")
        .setDescription(
          "Bármi problémát észlelsz a Galaxy Bot V3-al kapcsolatban kérlek szólj egy Adminnak, Moderátornak vagy a Tulajdonosnak.\n\u200BA Galaxy Bot parancsai az alábbi mezőkben lesznek felsorolva:\n\u200B"
        )
        .setColor("A84300")
        .addFields(
          {
            name: "│ .ping",
            value: "```Megmutatja a Bot pingjét.```\u200B",
            inline: false,
          },
          {
            name: "│ .botinfo │ .binfo",
            value: "```Információ a Botról.```\u200B",
            inline: false,
          },
          {
            name: "│ .uptime │ .up",
            value: "```Megmutatja, hogy a Bot mennyi ideje aktív.```\u200B",
            inline: false,
          },
          {
            name: "│ .meme │ .mem",
            value:
              "__Csak a '🐸・mémek' csatornában használható.__\n```Lekér egy random mémet a 'www.reddit.com/r/memes' oldalról.```\u200B",
            inline: false,
          },
          {
            name: "│ .weather város │ .w város",
            value:
              "__Csak az '⛅・időjárás' csatornában használható.__\n```A megadott város neve alapján megmondja az adott időjárással kapcsolatos információkat.```\u200B",
            inline: false,
          },
          {
            name: "│ .userinfo felhasználó │ .info felhasználó",
            value:
              "```A megadott felhasználóról információkat ad meg.```\u200B",
            inline: false,
          },
          {
            name: "│ .report felhasználó indok │ .rep felhasználó indok",
            value: "```A megjelölt felhasználót jelenti a moderátoroknak.```",
            inline: false,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "GALAXY szerver",
          iconURL: "attachment://galaxyBotV3Prof.jpg",
        });

      message.channel.send({
        embeds: [embed],
        files: [serverProf, botProf],
      });
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - help.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
