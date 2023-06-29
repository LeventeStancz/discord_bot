module.exports = {
  name: "tempmute",
  aliases: ["tempmute", "mute"],
  run: async (client, message, args) => {
    try {
      const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
      const serverProf = new AttachmentBuilder(
        "../container/src/Pictures/newGalaxyServerProf.png"
      );
      const botProf = new AttachmentBuilder(
        "../container/src/Pictures/galaxyBotV3Prof.jpg"
      );
      const { guildId } = process.env;
      const guild = client.guilds.cache.get(guildId);

      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        let msg = await message.channel.send(
          "Nincs jogosultságod ehhez a parancshoz."
        );
        setTimeout(() => {
          msg.delete();
          message.delete();
        }, 5000);
        return;
      }

      const mentionedUser = message.mentions.users.first();
      if (!mentionedUser) {
        let msg = await message.reply(
          "Jelöld meg a felhasználót akit némítani szeretnél."
        );
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 8000);
        return;
      }
      const mentionedMember = guild.members.cache.get(mentionedUser.id);
      if (
        mentionedMember.roles.cache.find((role) => role.name === "Moderátor") ||
        mentionedMember.roles.cache.find((role) => role.name === "Admin")
      ) {
        let msg = await message.reply("Ezt a felhasználót nem némíthatod.");
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 8000);
        return;
      }

      if (!args[1] || isNaN(args[1])) {
        let msg = await message.reply(
          "Add meg, hogy mennyi időre szeretnéd némítani a felhasználót. (perc - 5 15 30, óra - 1 2 3 12 24) (Pl.: .mute @GalaxyBotV3 15) -"
        );
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 8000);
        return;
      }

      var type;
      var checker = false;
      var amount;
      switch (args[1]) {
        case "5":
          type = "perc";
          amount = 5;
          break;
        case "15":
          type = "perc";
          amount = 15;
          break;
        case "30":
          type = "perc";
          amount = 30;
          break;
        case "1":
          type = "óra";
          amount = 60;
          break;
        case "2":
          type = "óra";
          amount = 120;
          break;
        case "3":
          type = "óra";
          amount = 180;
          break;
        case "12":
          type = "óra";
          amount = 720;
          break;
        case "24":
          type = "óra";
          amount = 1440;
          break;
        default:
          amount = 0;
          checker = true;
          break;
      }

      if (checker) {
        let msg = await message.reply(
          "Add meg, hogy mennyi időre szeretnéd némítani a felhasználót. (perc - 5 15 30, óra - 1 2 3 12 24) (Pl.: .mute @GalaxyBotV3 15)"
        );
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 8000);
        return;
      }
      let muteRole = guild.roles.cache.get("1004143681424592997");
      let tagRole = guild.roles.cache.get("1004142930849693706");
      if (mentionedMember.roles.cache.get(tagRole.id) !== undefined) {
        mentionedMember.roles.remove(tagRole);
      }
      if (mentionedMember.roles.cache.get(muteRole.id) === undefined) {
        mentionedMember.roles.add(muteRole);
      }

      let msg = await message.reply(
        "Sikeresen némítottad <@" + mentionedMember + "> felhasználót."
      );
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 5000);

      const schedule = require("node-schedule");
      var currentDate = new Date();
      var futureDate = new Date(currentDate.getTime() + amount * 60000);
      var year = futureDate.getFullYear();
      var month = (futureDate.getMonth() + 1).toString();
      var day = futureDate.getDate().toString();
      var hour = futureDate.getHours().toString();
      var min = futureDate.getMinutes().toString();
      const date = new Date(
        futureDate.getFullYear(),
        futureDate.getMonth(),
        futureDate.getDate(),
        futureDate.getHours(),
        futureDate.getMinutes()
      );

      try {
        client.users.fetch(mentionedUser.id).then((user) => {
          const embed = new EmbedBuilder()
            .setAuthor({
              name: mentionedUser.username,
              iconURL: "attachment://galaxyBotV3Prof.jpg",
            })
            .setTitle(
              "\u200B\n・Némítva lettél - __" +
                message.author.username +
                "__ - által.・❌\n\u200B"
            )
            .setDescription(
              "・A némítás lejár: **__" +
                year +
                "/" +
                (month.length === 1 ? "0" + month : month) +
                "/" +
                (day.length === 1 ? "0" + day : day) +
                " - " +
                (hour.length === 1 ? "0" + hour : hour) +
                ":" +
                (min.length === 1 ? "0" + min : min) +
                "__**・❌"
            )
            .addFields({ name: "\u200B", value: "\u200B" })
            .setColor("E74C3C")
            .setTimestamp()
            .setFooter({
              text: "GALAXY szerver",
              iconURL: "attachment://newGalaxyServerProf.png",
            });
          user.send({
            embeds: [embed],
            files: [serverProf, botProf],
          });
          ServerStatMuted(
            EmbedBuilder,
            guild,
            mentionedUser,
            message.author,
            year,
            month,
            day,
            hour,
            min,
            botProf,
            serverProf
          );
        });
      } catch (err) {
        console.log("err");
      }

      schedule.scheduleJob(date, function () {
        if (mentionedMember.roles.cache.get(tagRole.id) === undefined) {
          mentionedMember.roles.add(tagRole);
        }
        if (mentionedMember.roles.cache.get(muteRole.id) !== undefined) {
          mentionedMember.roles.remove(muteRole);
          client.users.fetch(mentionedUser.id).then((user) => {
            const embed = new EmbedBuilder()
              .setAuthor({
                name: mentionedUser.username,
                iconURL: "attachment://galaxyBotV3Prof.jpg",
              })
              .setTitle("\u200B\n・A némításod léjárt.・✅\n\u200B")
              .setColor("2ECC71")
              .setTimestamp()
              .setFooter({
                text: "GALAXY szerver",
                iconURL: "attachment://newGalaxyServerProf.png",
              });
            user.send({
              embeds: [embed],
              files: [serverProf, botProf],
            });
            ServerStatUnmuted(
              EmbedBuilder,
              guild,
              mentionedUser,
              botProf,
              serverProf
            );
          });
        }
      });
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - tempmute.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};

function ServerStatMuted(
  EmbedBuilder,
  guild,
  mentionedUser,
  mAuthor,
  year,
  month,
  day,
  hour,
  min,
  botProf,
  serverProf
) {
  let serverStatCh = guild.channels.cache.get("1004140443161866330");
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "Galaxy Bot V3",
      iconURL: "attachment://galaxyBotV3Prof.jpg",
    })
    .setTitle(
      "\u200B\n・" +
        mAuthor.username +
        " némította: - __" +
        mentionedUser.username +
        "__ - felhasználót.・❌\n\u200B"
    )
    .setDescription(
      "**・A némítása lejár: __" +
        year +
        "/" +
        (month.length === 1 ? "0" + month : month) +
        "/" +
        (day.length === 1 ? "0" + day : day) +
        " - " +
        (hour.length === 1 ? "0" + hour : hour) +
        ":" +
        (min.length === 1 ? "0" + min : min) +
        "__・❌**"
    )
    .addFields({ name: "\u200B", value: "\u200B" })
    .setColor("E74C3C")
    .setTimestamp()
    .setFooter({
      text: "GALAXY szerver",
      iconURL: "attachment://newGalaxyServerProf.png",
    });
  serverStatCh.send({
    embeds: [embed],
    files: [serverProf, botProf],
  });
}

function ServerStatUnmuted(
  EmbedBuilder,
  guild,
  mentionedUser,
  botProf,
  serverProf
) {
  let serverStatCh = guild.channels.cache.get("1004140443161866330");
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "Galaxy Bot V3",
      iconURL: "attachment://galaxyBotV3Prof.jpg",
    })
    .setTitle("\u200B\n・" + mentionedUser.username + " némítása lejárt.・✅")
    .addFields({ name: "\u200B", value: "\u200B" })
    .setColor("E74C3C")
    .setTimestamp()
    .setFooter({
      text: "GALAXY szerver",
      iconURL: "attachment://newGalaxyServerProf.png",
    });
  serverStatCh.send({
    embeds: [embed],
    files: [serverProf, botProf],
  });
}
