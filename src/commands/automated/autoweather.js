module.exports = {
  name: "autoweather",
  aliases: ["autoweather", "aw"],
  run: async (client, message, args) => {
    const { EmbedBuilder } = require("discord.js");
    const cron = require("cron");
    const weather = require("openweather-apis");
    const guild = client.guilds.cache.get("1004138781298937866");
    const weatherChannel = guild.channels.cache.get("1004139417935560825");

    var scheduledMessage = new cron.CronJob("00 00 05,13 * * *", async () => {
      try {
        weather.setLang("hu");
        weather.setCity("Budapest");
        weather.setUnits("metric");
        weather.setAPPID("a3dafd88558f7e75ed6e9b6452f7dff1");

        weather.getAllWeather(function (err, data) {
          if (data === null) {
            weatherChannel.send(`Nincs találat a következőre: ${city}`);
            return;
          }
          const embed = new EmbedBuilder()
            .setAuthor({
              name: `Automatikus időjárás: \nBudapest, Magyarország`,
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
          weatherChannel.send({ embeds: [embed] });
        });
      } catch (error) {
        console.log(
          "Hiba a modul futtatása közben. - autoweather.js - " + error
        );
        message.channel.send("Hiba történt a parancs futattása közben.");
      }
    });

    if (args[0] == "stop") {
      scheduledMessage.stop();
      message.channel.send("Automatikus időjárás jelentés **leállítva.**");
    }
    if (args[0] == "start") {
      scheduledMessage.start();
      message.channel.send("Automatikus időjárás jelentés **elindítva.**");
    }
  },
};
