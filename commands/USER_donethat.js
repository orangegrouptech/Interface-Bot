module.exports = {
    name: 'donethat',
    aliases: ['done'],
    description: '**This is a game command.**\n😱 Have you done it?\n(Make sure you run .neverhaveiever to get a statement.).',
    usage: '',
    hidden:true,
    cooldown: 0,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      //Pick a question
      const never = require('./never.json');
      const arg = message.content.slice('').trim().split(/ +/g); 
      console.log(arg[1])
      var modified = arg[1] - 1
      const item = never[modified];
      console.log(item)
      console.log("If you see undefined and then an error, check code!")
      if(arg[1] > 25) {
          respond('Invalid Never ID','Please make sure you entered a valid Never ID.',message.channel)
          return
        }else {
            ihavenever()
        }
        function ihavenever() {
        respond('',"<@" + message.author.id + "> has done this! 😱\n" + "*Never have I ever* *" + item.neverhaveiever + "*", message.channel)
        return
        }
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }