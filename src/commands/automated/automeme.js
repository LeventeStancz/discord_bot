module.exports = {
  name: "automeme",
  aliases: ["automeme", "am"],
  run: async (client, message, args) => {
    const { EmbedBuilder } = require("discord.js");
    const cron = require("cron");
    const axios = require("axios");
    const memeChannel = client.channels.cache.get("1004146969230454794");

    let scheduledMessage = new cron.CronJob("00 00 14 * * *", async () => {
      try {
        const embed = new EmbedBuilder();

        axios
          .get("https://www.reddit.com/r/MemeEconomy.json")
          .then(function (response) {
            const posts = response.data.data.children.filter(
              (post) =>
                post.data.ups >= 50 &&
                post.data.over_18 === false &&
                post.data.is_reddit_media_domain === true &&
                post.data.domain === "i.redd.it"
            );
            const uniquePosts = [
              ...posts
                .reduce(
                  (itemsMap, item) =>
                    itemsMap.has(item.data.title)
                      ? itemsMap
                      : itemsMap.set(item.data.title, item),
                  new Map()
                )
                .values(),
            ];
            const post =
              uniquePosts[Math.floor(Math.random() * uniquePosts.length)];
            let permalink = post.data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImg = post.data.url;
            let memeTitle = post.data.title;
            let memeUpvotes = post.data.ups;
            let memeDownvotes = post.data.downs;
            let memeNumComments = post.data.num_comments;

            embed.setTitle("__**Napi meme:**__ --- 🤣\n" + `${memeTitle}`);
            embed.setURL(`${memeUrl}`);
            embed.setImage(memeImg);
            embed.setColor("Orange");
            embed
              .setFooter({
                text: `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`,
              })
              .setTimestamp();

            memeChannel.send({ embeds: [embed] });
          })
          .catch(function (error) {
            console.log("automeme axios get error: " + error);
          });
      } catch (error) {
        console.log("Hiba a modul futtatása közben. - automeme.js - " + error);
        message.channel.send("Hiba történt a parancs futattása közben.");
      }
    });

    if (args[0] == "stop") {
      scheduledMessage.stop();
      message.channel.send("Automatikus mém beküldése **leállítva.**");
    }
    if (args[0] == "start") {
      scheduledMessage.start();
      message.channel.send("Automatikus mém beküldése **elindítva.**");
    }
  },
};
