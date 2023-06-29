module.exports = {
  name: "uptime",
  aliases: ["uptime", "up"],
  run: async (client, message) => {
    try {
      const ms = require("ms");

      message.reply(
        `Aktív vagyok - **/ ${ms(client.uptime, { long: true })} /** - óta.`
      );
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - uptime.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
