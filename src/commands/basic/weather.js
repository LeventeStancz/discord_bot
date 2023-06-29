module.exports = {
  name: "weather",
  aliases: ["weather", "w"],
  run: async (client, message, args) => {
    try {
      const { EmbedBuilder } = require("discord.js");
      const weather = require("openweather-apis");

      if (args[0] === undefined) {
        message.channel.send(
          `Meg kell adnod a város nevét. (Pl.: .weather Budapest)`
        );
        return;
      }

      let city = args[0];
      if (args[1] !== undefined) {
        city += " " + args[1];
      }
      if (args[2] !== undefined) {
        city += " " + args[2];
      }

      weather.setLang("hu");
      weather.setCity(city);
      weather.setUnits("metric");
      weather.setAPPID("a3dafd88558f7e75ed6e9b6452f7dff1");

      weather.getAllWeather(function (err, data) {
        if (data === null) {
          message.channel.send(`Nincs találat a következőre: ${city}`);
          return;
        }
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `Időjárás a következőről: \n${city}`,
          })
          .setDescription(`__${data.weather[0].description}__`)
          .addFields(
            {
              name: "Hőmérséklet:",
              value: `${Math.round(data.main.temp)} C°`,
              inline: false,
            },
            {
              name: "Hőérzet:",
              value: `${Math.round(data.main.feels_like)} C°`,
              inline: false,
            },
            {
              name: "Szél:",
              value: `${data.wind.speed} km/ó`,
              inline: false,
            },
            {
              name: "Páratartalom:",
              value: `${data.main.humidity} %`,
              inline: false,
            }
          );
        message.channel.send({ embeds: [embed] });
      });
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - weather.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};
