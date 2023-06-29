module.exports = {
  name: "clear",
  aliases: ["clear", "c"],
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.channel.send("Nincs jogosultságod ehhez a parancshoz.");
      if (isNaN(args[0]) || parseInt(args[0]) <= 0)
        return message.channel.send("Kérlek adj meg mennyiséget.");
      let deleteAmount;
      if (parseInt(args[0]) > 10) {
        return message.channel.send("Túl nagy a mennyiség amit megadtál.");
      } else {
        deleteAmount = parseInt(args[0]);
      }
      message.channel.bulkDelete(deleteAmount + 1, true);
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - clear.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
