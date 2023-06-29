module.exports = {
  name: "ping",
  aliases: ["ping"],
  run: async (client, message) => {
    try {
      const msg = await message.channel.send("Pingelés folyamatban...");

      const latency = msg.createdTimestamp - message.createdTimestamp;

      msg.edit(
        `Bot késleltetés: **/ ${latency}ms /**, API késleltetés: **/ ${client.ws.ping}ms /**.`
      );
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - ping.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
