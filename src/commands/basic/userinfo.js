module.exports = {
  name: "userinfo",
  aliases: ["userinfo", "info"],
  run: async (client, message) => {
    try {
      const moment = require("moment");
      const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
      const serverProf = new AttachmentBuilder(
        "../container/src/Pictures/newGalaxyServerProf.png"
      );

      const mentionedUser = message.mentions.users.first();
      if (!mentionedUser) {
        let msg = await message.reply(
          "Jelöld meg a felhasználót akiről információt szeretnél látni."
        );
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 8000);
        return;
      }
      const mentionedMember = message.guild.members.cache.get(mentionedUser.id);

      const status =
        mentionedMember.presence === null
          ? "offline"
          : mentionedMember.presence.status;

      var activityType = "Nem csinál semmit";
      var activity = "Nem csinál semmit";
      if (status !== "offline") {
        switch (mentionedMember.presence.activities[0].type) {
          case 0:
            activityType = "Játékban";
            break;
          case 1:
            activityType = "Megosztja";
            break;
          case 2:
            activityType = "Hallgatja";
            break;
          case 3:
            activityType = "Nézi";
            break;
          case 5:
            activityType = "Részt vesz";
            break;
          default:
            activityType = "Nem csinál semmit";
            break;
        }
        activity = mentionedMember.presence.activities[0].name;
      }

      const roles = mentionedMember.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0);

      const dcConnect = `${moment(mentionedMember.user.createdTimestamp).format(
        "YYYY/MM/DD"
      )}`;
      const serverConnect = `${moment(mentionedMember.joinedAt).format(
        "YYYY/MM/DD"
      )}`;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: mentionedMember.user.username,
          iconURL: mentionedMember.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle("Információk a következő felhasználóról:")
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setDescription(mentionedMember.user.username + "\n\u200B")
        .setColor("F1C40F")
        .addFields(
          {
            name: "・A felhasználó neve és megkülönböztetője:",
            value:
              "```" +
              `${mentionedMember.user.username}#${mentionedMember.user.discriminator}` +
              "```━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            inline: false,
          },
          {
            name: "・Státusz:",
            value: "```" + `${status}` + "```",
            inline: true,
          },
          {
            name: "・Cselekvés tipusa:",
            value: "```" + `${activityType}` + "```",
            inline: true,
          },
          {
            name: "・Cselekvés:",
            value: "```" + `${activity}` + "```",
            inline: true,
          },
          {
            name: "・Rangok:",
            value: `${roles}`,
            inline: false,
          },
          {
            name: "・Discordhoz való csatlakozás:",
            value: "```" + `${dcConnect}` + "```",
            inline: false,
          },
          {
            name: "・Szerverhez való csatlakozás:",
            value: "```" + `${serverConnect}` + "```",
            inline: false,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "GALAXY szerver",
          iconURL: "attachment://newGalaxyServerProf.png",
        });

      message.channel.send({
        embeds: [embed],
        files: [serverProf],
      });
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - userinfo.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
