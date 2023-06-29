# discord_bot
Discord bot for my discord server. The bot handles message permissions and also has various commands handled with a command handler.

The bots main function:
  Handles every message being sent on the server. Checks if the sender (member) has the permissions for the channel the message was sent.
  Has various commands, two automated and eleven other.
Command handler:
  The command handler runs through the .js files in the "commands" folder.
  If a file can't be loaded it displays the name of the file and an error message.
  After every file is loaded the bot starts and whenever there is a request for a command by a member the command handler runs that file.

Automated commands:
  .autoweather start/stop
    This command uses an open weather api to get the information about the weather at a specific location (Budapest) and then using cron jobs it display it
    at the given time repeatedly.
  .automeme start/stop
    This command uses axios to get a random meme from `https://www.reddit.com/r/MemeEconomy.json` and using crion jobs it displays
    it at the given time repeatedly.

Other commands:
  The other commands are quite straightforward looking at the file names or the code in the files.

  .botinfo
    Displays information about the bot.
  .clear NUMBER
    Deletes a given amount of messages in the channel the command was requested.
  .help
    Display all the commands and command usage.
  .meme
    Display a random meme from `https://www.reddit.com/r/MemeEconomy.json` and displays it.
  .ping
    Checks the bots ping.
  .report @member ARGUMENT
    Gives the mentioned member a report counter. Once the members report counter hits 5 the member gets muted for 12 hours and the counter resets.
    Also sends information about the report to staff members.
  .rules
    Displays the server rules.
  .tempmute @member TIME
    Mutes the given member for the specified amount of time. (minute - 5,15,30 | hour - 1,2,3,12,24)
  .uptime
    Display how long the bot has been active.
  .userinfo @member
    Displays information about the given member.
  .weather CITY
    Displays weather information about the given city.
