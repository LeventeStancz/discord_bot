module.exports = (client) => {
  try {
    const fs = require("fs");
    const subFolders = fs.readdirSync("./src/commands/");
    console.log("Subfolders: " + subFolders.length);

    var fileCount = 0;
    const fileArrays = subFolders.map((dir) => {
      let allfile = fs
        .readdirSync(`./src/commands/${dir}/`)
        .filter((file) => file.endsWith(".js"));
      fileCount += allfile.length;
      return { folder: dir, array: allfile };
    });

    console.log("Files: " + fileCount + "\n");

    fileArrays.forEach((obj) => {
      if (obj.array.length > 0) {
        obj.array.forEach((file) => {
          let command = require(`../commands/${obj.folder}/${file}`);
          if (command) {
            client.commands.set(command.name, command);
            if (command.aliases && Array.isArray(command.aliases)) {
              command.aliases.forEach((alias) => {
                client.aliases.set(alias, command.name);
              });
            }
            console.log(`${command.name} - ready`);
          } else {
            console.log(`${command.name} - error`);
          }
        });
      }
    });
  } catch (error) {
    console.log(
      "Hiba a modul futtatása közben. - CommandHandler.js - " + error
    );
  }
};
