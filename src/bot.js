require("dotenv").config();
const { token, guildId } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
  Partials,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const serverProf = new AttachmentBuilder(
  "../container/src/Pictures/newGalaxyServerProf.png"
);
const botProf = new AttachmentBuilder(
  "../container/src/Pictures/galaxyBotV3Prof.jpg"
);
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = ".";
module.exports = client;

require(`./Handler/CommandHandler`)(client);

//member join handler

//reaction based role giving
const json = require("./commands/basic/ruleMessage.json");
const id = json.ruleMessageId;

client.once("ready", async () => {
  if (id) {
    try {
      const guild = client.guilds.cache.get(guildId);
      let ruleChannel = guild.channels.cache.get("1004138781298937869");
      let ruleMessage = await ruleChannel.messages.fetch(id);

      const filter = (reaction) => reaction.emoji.name == "👍";
      const collector = ruleMessage.createReactionCollector(filter);

      collector.on("collect", (messageReaction, user) => {
        let role = guild.roles.cache.get("1004142930849693706");
        let person = guild.members.cache.get(user.id);

        if (person.roles.cache.get("1004143681424592997") !== undefined) return;

        if (person.roles.cache.get(role.id) === undefined) {
          person.roles.add(role);
          console.log(
            person.user.username + " megkapta a " + role.name + " rangot."
          );

          let botCmdCh = guild.channels.cache.get("1004139392635510855");

          const embed = new EmbedBuilder()
            .setAuthor({
              name: "Galaxy Bot V3",
              iconURL: "attachment://galaxyBotV3Prof.jpg",
            })
            .setTitle(
              "\u200BÜdv a szerveren " + person.user.username + " !\u200B"
            )
            .setDescription(
              "\u200BÉrezd jól magad a szerveren. Ha érdekelnek a parancsaim használd a __.help__ parancsot a <#" +
                botCmdCh +
                "> csatornában.\u200B"
            )
            .setColor("FFFF00")
            .setTimestamp()
            .setFooter({
              text: "GALAXY szerver",
              iconURL: "attachment://newGalaxyServerProf.png",
            });
          user.send({
            embeds: [embed],
            files: [serverProf, botProf],
          });
        }
      });
    } catch (error) {
      console.log("error while catching reaction on ruleMessage");
    }
  }
});

//member handler

//member join

client.on("guildMemberAdd", (member) => {
  const guild = client.guilds.cache.get(guildId);
  var serverStatChannel = guild.channels.cache.get("1004140443161866330");
  serverStatChannel.send(`🔷 ${member} - Belépett a szerverre. 🔷`);
  console.log(member.user.username + " - 🔷Belépett a szerverre.🔷");
  CheckMemberCount();
});

//member quit

client.on("guildMemberRemove", async (member) => {
  const guild = client.guilds.cache.get(guildId);
  var serverStatChannel = guild.channels.cache.get("1004140443161866330");
  serverStatChannel.send(`🔶 ${member} - Kilépett a szerverről. 🔶`);
  console.log(member.user.username + " - 🔶Kilépett a szerverről.🔶");
  CheckMemberCount();
});

//client login

client
  .login(token)
  .then(() => {
    console.log("\nGalaxy Bot V3 is ready to roll!");
    client.user.setPresence({
      activities: [{ name: `.help`, type: ActivityType.Listening }],
      status: "online",
    });
    CheckMemberCount();
  })
  .catch((err) => console.log(err));

//membercountChecker

async function CheckMemberCount() {
  const guild = client.guilds.cache.get(guildId);

  let members = await guild.members.fetch();

  var memberCount = members.filter((member) => !member.user.bot).size;
  var memberCountChannel = guild.channels.cache.get("1004139169985069076");
  memberCountChannel
    .setName(`🧍・Tagok: ${memberCount}`)
    .catch((err) =>
      console.log("Error when updating server stat name. " + err)
    );

  var botCount = members.filter((member) => member.user.bot).size;
  var botCountChannel = guild.channels.cache.get("1004139210720161802");
  botCountChannel
    .setName(`🤖・Szerver botok: ${botCount}`)
    .catch((err) =>
      console.log("Error when updating server stat name. " + err)
    );
}

//message checker

client.on("messageCreate", async (message) => {
  if (message.author.bot && message.content.startsWith(".mute")) {
    runCommand(message);
  }
  if (message.author.bot) return;

  const guild = client.guilds.cache.get(guildId);

  const botChannels = [
    "1004140405845139577", //staff bot parancsok
    "1004139496603918487", //twitch youtube
    "1004139392635510855", //bot parancsok
  ];

  //exceptional messages

  //tempmute
  if (
    message.content.startsWith(client.prefix + "tempmute") ||
    message.content.startsWith(client.prefix + "mute")
  ) {
    runCommand(message);
    return;
  }

  //clear
  if (
    message.content.startsWith(client.prefix + "clear") ||
    message.content.startsWith(client.prefix + "c")
  ) {
    runCommand(message);
    return;
  }

  //report
  if (
    message.content.startsWith(client.prefix + "report") ||
    message.content.startsWith(client.prefix + "rep")
  ) {
    runCommand(message);
    return;
  }

  //exceptional channel messages

  //rule channel

  let ruleChannel = guild.channels.cache.get("1004138781298937869");
  if (message.channel.id === ruleChannel.id) {
    if (!message.content.startsWith(client.prefix)) {
      let msg = await message.reply(
        "Ebben a szöveg csatornában **csak** a Galaxy **Bot szerver szabályzattal kapcsolatos parancsai használhatóak**."
      );
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 5000);
      return;
    } else {
      runCommand(message);
      return;
    }
  }

  //bot testing

  let botTesting = guild.channels.cache.get("1004140651903987773");

  if (message.channel.id === botTesting.id) {
    if (!message.content.startsWith(client.prefix)) {
      return;
    } else {
      runCommand(message);
      return;
    }
  }

  //weather

  let weatherChannel = guild.channels.cache.get("1004139417935560825");

  if (message.channel.id === weatherChannel.id) {
    if (
      !message.content.startsWith(client.prefix) ||
      (!message.content.startsWith(client.prefix + "weather") &&
        !message.content.startsWith(client.prefix + "w") &&
        !message.content.startsWith(client.prefix + "aw") &&
        !message.content.startsWith(client.prefix + "autoweather"))
    ) {
      let msg = await message.reply(
        "Ebben a szöveg csatornában **csak** a Galaxy **Bot időjárással kapcsolatos parancsai használhatóak**."
      );
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 5000);
      return;
    }
    //Passed all verification
    runCommand(message);
    return;
  }

  //memes

  let memeChannel = guild.channels.cache.get("1004146969230454794");

  if (message.channel.id === memeChannel.id) {
    if (!message.content.startsWith(client.prefix)) {
      return;
    }
    if (
      !message.content.startsWith(client.prefix + "meme") &&
      !message.content.startsWith(client.prefix + "m") &&
      !message.content.startsWith(client.prefix + "am") &&
      !message.content.startsWith(client.prefix + "automeme")
    ) {
      let msg = await message.reply(
        "Ebben a szöveg csatornában **csak** a Galaxy **Bot mémekkel kapcsolatos parancsai használhatóak**."
      );
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 5000);
      return;
    }
    runCommand(message);
    return;
  }

  //other messages

  if (!message.content.startsWith(client.prefix)) {
    if (botChannels.includes(message.channel.id)) {
      let msg = await message.reply(
        "Ebben a szöveg csatornában **csak** a Galaxy **Bot parancsai használhatóak**."
      );
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 5000);
      return;
    } else {
      return;
    }
  } else {
    if (!botChannels.includes(message.channel.id)) {
      let msg = await message.reply(
        "Ebben a szöveg csatornában **nem lehet** a Galaxy **Bot parancsait használni**."
      );
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 5000);
      return;
    } else {
      runCommand(message);
    }
  }
});

//command handler
async function runCommand(message) {
  try {
    let args = message.content.slice(client.prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();
    const cmdFile =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (cmdFile === undefined) {
      let msg = await message.reply(
        "Sajnos **nincs ilyen parancsom**. Lehetséges, hogy elírtad, probáld újra! 🤓"
      );
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 5000);
      return;
    }
    cmdFile.run(client, message, args);
  } catch (error) {
    console.log("Something went wrong executing a command.");
    message.channel.send("Valami hiba történt a parancs futtatása közben.");
  }
}
