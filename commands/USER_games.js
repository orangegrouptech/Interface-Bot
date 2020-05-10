module.exports = {
    name: 'games',
    aliases: ['gamecenter', 'gamecentre'],
    description: 'Shows all game commands.',
    cooldown: 5,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      try {
        respond('Game Center 🎮',"**Welcome to the Game Center!**\nHere are some game commands you can use to play with Apple Moderator:\n----------------------\n**.cryptogram**\n**.neverhaveiever**\n**.rolldicegame**\n**.slots**\n**.trivia (broke 4 times and may be broken)**\n----------------------\nIf you want to suggest questions/Never have I ever statements, use these:\n**.neverhaveieversuggest**\n**.suggestquestion**\n----------------------", message.channel, '999999', `\nHave fun with Apple Mod!\nFrom the team of developers behind Apple Moderator.`)
        message.delete()
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}