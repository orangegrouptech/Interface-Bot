module.exports = {
    name: 'solve',
    aliases: ['puttogether'],
    description: '**This is a game command.**\nYou found another hidden command? Who\'s telling you this? Anyway., if you know the answer to my puzzle, use this command.',
    usage: '(Puzzle ID) (answer in one word)',
    cooldown: 0,
    hidden:true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      //Pick a cryptogram
      const topsecret = require('./classified.json');
      const arg = message.content.slice('').trim().split(/ +/g);
      console.log(arg[1])
      var modified = arg[1] - 1
      const item = topsecret[modified];
      console.log(arg[2])
      if(!item)  {
        respond('Invalid Puzzle ID','I received a fatal error. Next time, please put a valid Puzzle ID.',message.channel)
        message.delete()
        return
      }
      console.log(item)
      console.log(item.answer)
        if(arg[2] === item.answercase){
        console.log("answer correct, capital letters")
        respond('Congratulations.',"You got Puzzle Number " + item.puzzlenumber + " right. Give yourselves a round of applause.", message.channel) 
        message.delete()
        return
      } else if(arg[2] === item.answer){
        console.log("answer correct")
        respond('Congratulations.',"You got Puzzle Number " + item.puzzlenumber + " right. Give yourselves a round of applause.", message.channel) 
        message.delete()
        return
      } else {
        console.log("answer wrong")
          respond('Sorry.',"This is the wrong answer for Puzzle Number " + item.puzzlenumber + ". Talk with your accomplices about this.", message.channel) 
          message.delete()
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