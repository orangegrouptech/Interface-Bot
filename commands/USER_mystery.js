module.exports = {
    name: 'mystery',
    aliases: ['classified', 'secret', 'topsecret'],
    description: '**This is a game command.**\nHello. You have found me. No one knows what happens when you run me.',
    usage: '',
    cooldown: 0,
    hidden: true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      //Transmission begin.
      const secret = require('./classifiedpieces.json');
      const item = secret[Math.floor(Math.random() * secret.length)];
      const filter = response => {
        console.log(response)
        return item.answer
      }
      console.log(item)
      message.delete()
      respond('<REDACTED>',"**~ENCRYPTED TRANSMISSION BEGIN.~**\nHello, <@"+ message.author.id + ">.\nI see you have found the secret command.\nI'm going to let you in on a piece of puzzle number **" + item.puzzlenumber + "**.\nThat piece is **" + item.puzzlepiece + "**.\nThat piece I gave you is labeled **" + item.puzzlepieceid + ".**\nContact other accomplices to see if they have pieces of the puzzle.\nIf you have the answer, type .solve (puzzle number) (answer in one word, connected).\nIf you are confused, dear friend, this is how.\n*.solve 3 HELLOWORLDHOWAREYOUDOINGTODAY*\nGood luck, and may you get the puzzle right.\n*Signed, Anonymous.*\n**~TRANSMISSION END.~**", message.channel) 
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }