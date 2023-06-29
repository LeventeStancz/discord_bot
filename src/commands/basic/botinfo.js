module.exports = {
  name: "botinfo",
  aliases: ["botinfo", "binfo"],
  run: async (client, message) => {
    try {
      const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
      const ms = require("ms");
      const botProf = new AttachmentBuilder(
        "../container/src/Pictures/galaxyBotV3Prof.jpg"
      );
      const serverProf = new AttachmentBuilder(
        "../container/src/Pictures/newGalaxyServerProf.png"
      );

      const commandCount = client.commands.size;
      const status = client.presence.status;
      const clientUsername = client.user.username;
      const clientDiscriminator = client.user.discriminator;
      const clientId = client.user.id;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: "Galaxy Bot V3",
          iconURL: "attachment://galaxyBotV3Prof.jpg",
        })
        .setTitle("Információk a Galaxy Bot 3-as verziójáról.")
        .setThumbnail("attachment://galaxyBotV3Prof.jpg")
        .setDescription(
          "Bármi problémát észlelsz a bottal kapcsolatban kérlek jelezd valamelyik moderátornak.\n\u200B"
        )
        .setColor("CC7900")
        .addFields(
          {
            name: "Parancsok száma:",
            value: "```" + `${commandCount}` + "db```━━━━━━━━━━━━━",
            inline: true,
          },
          {
            name: "Bot státusza:",
            value: "```" + `${status}` + "```━━━━━━━━━━━━━",
            inline: true,
          },
          {
            name: "Bot elérhető:",
            value:
              "```" +
              `${ms(client.uptime, { long: true })}` +
              "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "Felhasználónév:",
            value:
              "```" + `${clientUsername}` + "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "Megkülönböztető:",
            value:
              "```#" +
              `${clientDiscriminator}` +
              "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "Id:",
            value: "```" + `${clientId}` + "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Galaxy Bot V3",
          iconURL: "attachment://newGalaxyServerProf.png",
        });

      message.channel.send({
        embeds: [embed],
        files: [serverProf, botProf],
      });
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - botinfo.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
