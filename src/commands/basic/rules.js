module.exports = {
  name: "rule",
  aliases: ["rules"],
  run: async (client, message) => {
    try {
      const fs = require("fs");
      const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
      const ruleChannel = client.channels.cache.get("1004138781298937869");
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
        .setTitle("A szabályzat elfogadásához reagálj az üzenetre.")
        .setThumbnail("attachment://newGalaxyServerProf.png")
        .setDescription(
          "A szabályzat elolvasása és elfogadása kötelező a szerverre belépéshez.\n\u200B"
        )
        .setColor("CC7900")
        .addFields(
          {
            name: "・ 1️⃣ ・",
            value:
              "```Kövesd a Discord szolgáltatási feltételeit és a közösségi irányelveket.```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ 2️⃣ ・",
            value:
              "```Mutass tiszteletet mások iránt, ha elvárod, hogy feléd is tiszteletet mutassanak.```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ 3️⃣ ・",
            value:
              "```Ne hirdess más szervereket vagy bármi egyebet a szerveren.```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ 4️⃣ ・",
            value:
              "```Ne politizálj. Ezen a szerveren nincs helye a politikának.```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ 5️⃣ ・",
            value:
              "```Szöveges üzenetet a megfelelő szöveg csatornába küldj.```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ 6️⃣ ・",
            value:
              "```Ne spamelj a szöveg csatornákban.```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "GALAXY szerver",
          iconURL: "attachment://galaxyBotV3Prof.jpg",
        });

      let ruleMsg = await ruleChannel.send({
        embeds: [embed],
        files: [serverProf, botProf],
      });

      let template = {
        ruleMessageId: ruleMsg.id,
      };

      ruleMsg.react("👍");

      let json = JSON.stringify(template, null, 2);
      fs.writeFile("./src/commands/basic/ruleMessage.json", json, (err) => {
        if (err) {
          console.log("Error writing file - rulemessage - ", err);
        }
      });
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - rules.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
