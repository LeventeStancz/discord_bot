module.exports = {
  name: "report",
  aliases: ["report", "rep"],
  run: async (client, message, args) => {
    try {
      const fs = require("fs");
      const { guildId } = process.env;
      const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
      const serverProf = new AttachmentBuilder(
        "../container/src/Pictures/newGalaxyServerProf.png"
      );
      const botProf = new AttachmentBuilder(
        "../container/src/Pictures/galaxyBotV3Prof.jpg"
      );
      const guild = client.guilds.cache.get(guildId);
      const mentionedUser = message.mentions.users.first();
      if (!mentionedUser) {
        let msg = await message.reply(
          "Jelöld meg a felhasználót akit reportolni szeretnél."
        );
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 8000);
        return;
      }
      args.shift();
      if (args.length < 3) {
        let msg = await message.reply(
          "Add meg a reportolás indokát, amely legalább 3 szóból áll."
        );
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 8000);
        return;
      }
      const date = new Date(message.createdTimestamp);
      const time = date.getHours() + ":" + date.getMinutes();
      const dateF =
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      var reason = args.join(" ");
      const mentionedMember = guild.members.cache.get(mentionedUser.id);
      const reporterUser = message.author;
      const reporterMember = guild.members.cache.get(reporterUser.id);
      const reportChannel = client.channels.cache.get("1004140461046374501");

      var rawdata = fs.readFileSync("./src/commands/basic/reportCounter.json");
      const jsonData = JSON.parse(rawdata);

      var reportCount = 1;
      if (jsonData.length > 0) {
        reportCount =
          jsonData.find((obj) => obj.id === mentionedUser.id).count + 1;
      }

      const embed = new EmbedBuilder()
        .setAuthor({
          name: reporterUser.username,
          iconURL: reporterMember.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle("Reportolta a következő felhasználót:")
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setDescription(mentionedMember.user.username + "\n\u200B")
        .setColor("E74C3C")
        .addFields(
          {
            name: "・ Reportolt felhasználó neve és megkülönböztetője:",
            value:
              "```" +
              `${mentionedMember.user.username}#${mentionedMember.user.discriminator}` +
              "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ Csatorna ahol reportolták:",
            value: `│ ${message.channel} │\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            inline: false,
          },
          {
            name: "・ Report indoka:",
            value: "```" + `${reason}` + "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ Ekkor reportolták:",
            value:
              "```" + `${dateF} - ${time}` + "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・ Hányszor reportolták (A jelenlegivel együtt):",
            value: "```" + `${reportCount}` + "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "GALAXY szerver",
          iconURL: "attachment://newGalaxyServerProf.png",
        });

      reportChannel.send({
        embeds: [embed],
        files: [serverProf],
      });

      let msg = await message.channel.send(
        "Sikeresen reportoltad <@" + mentionedMember + "> felhasználót!"
      );
      setTimeout(() => {
        msg.delete();
        message.delete();
      }, 5000);

      let userId = mentionedUser.id;

      let found = false;

      if (reportCount === 5) {
        jsonData.map((obj) => {
          if (obj.id === userId) {
            obj.count = 0;
            found = true;
            return obj;
          }
        });
        const embed2 = new EmbedBuilder()
          .setAuthor({
            name: "Galaxy Bot V3",
            iconURL: "attachment://galaxyBotV3Prof.jpg",
          })
          .setTitle(
            "\u200B\n・Reportok száma elérte a maximális limitet.・❌\n\u200B"
          )
          .setDescription(
            "\u200B\n・Már 5 alkalommal reportoltak téged a GALAXY szerveren, ezért 12 óra némítást kaptál.・❌"
          )
          .addFields({ name: "\u200B", value: "\u200B" })
          .setColor("E74C3C")
          .setTimestamp()
          .setFooter({
            text: "GALAXY szerver",
            iconURL: "attachment://newGalaxyServerProf.png",
          });

        mentionedUser.send({
          embeds: [embed2],
          files: [serverProf, botProf],
        });

        const staffBotCh = client.channels.cache.get("1004140405845139577");
        staffBotCh.send(".mute <@" + mentionedUser.id + "> 12");
      } else {
        jsonData.map((obj) => {
          if (obj.id === userId) {
            obj.count = obj.count + 1;
            found = true;
            return obj;
          }
        });
      }

      if (found === false) {
        jsonData.push({ id: userId, count: 1 });
      }

      let json = JSON.stringify(jsonData, null, 2);
      fs.writeFile("./src/commands/basic/reportCounter.json", json, (err) => {
        if (err) {
          console.log("Error writing file - reportCounter - ", err);
        }
      });
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - report.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
