var count;

module.exports = {
  name: "meme",
  aliases: ["meme", "mem"],
  run: async (client, message, args) => {
    try {
      const { EmbedBuilder } = require("discord.js");
      const axios = require("axios");

      const embed = new EmbedBuilder();

      count = 0;
      memeGet(embed, message, axios);
    } catch (error) {
      console.log("Hiba a modul futtatása közben. - meme.js - " + error);
      message.channel.send("Hiba történt a parancs futattása közben.");
    }
  },
};

function memeGet(embed, message, axios) {
  axios
    .get("https://www.reddit.com/r/memes/random/.json")
    .then(function (response) {
      let post = response.data[0].data.children[0];

      if (count >= 5) {
        message.channel.send(
          "A mém lekérdezése túllépte a megadott időkorlátot. Probáld újra később."
        );
        return;
      }

      if (
        post.data.over_18 !== false &&
        post.data.is_reddit_media_domain !== true &&
        post.data.domain !== "i.redd.it"
      ) {
        memeGet();
        count++;
        return;
      }

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

      try {
        message.channel.send({ embeds: [embed] });
      } catch (err) {
        console.log("Hiba a modul futtatása közben. - automeme.cjs - " + error);
        message.channel.send("Hiba történt a parancs futattása közben.");
      }
    })
    .catch(function (error) {
      console.log("automeme axios get error: " + error);
    });
}
