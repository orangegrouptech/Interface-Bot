module.exports = {
    name: 'decrypt',
    aliases: ['dec', 'crackcode'],
    description: '**This is a game command.**\nFound the real meaning? Use this command to guess!\n(Make sure you run .cryptogram to get an encrypted message.)',
    usage: '(Cryptogram ID) (answer in one word) | .decrypt 5 HELLOWORLDHOWAREYOUDOING',
    cooldown: 0,
    hidden:true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      //Pick a cryptogram
      const crypto = require('./crypt.json');
      const arg = message.content.slice('').trim().split(/ +/g);
      console.log(arg[1])
      var modified = arg[1] - 1
      const item = crypto[modified];
      console.log(item)
      console.log(item.decrypted)
      console.log(arg[2])
      if(item === 'undefined')  {
        respond('Invalid Cryptogram ID','Please make sure you entered a valid Cryptogram ID.',message.channel)
        return
      }
        if(arg[2] === item.decryptedcase){
        console.log("answer correct, capital letters")
        respond('Correct!',"c0n6ra7ul4710n5 h4ck3r, y0u g07 17 r16h7! m4k3 5ur3 t0 u53 4ll 5m4ll l3773r5, 7h0u6h.\n(Congratulations hacker, you got it right! Make sure you use all small letters, though.)", message.channel) 
        return
      } else if(arg[2] === item.decrypted){
        console.log("answer correct")
        respond('Correct!',"c0n6ra7ul4710n5 h4ck3r, y0u g07 17 r16h7!\n(Congratulations hacker, you got it right!)", message.channel) 
        return
      } else {
        console.log("answer wrong")
          respond('Wrong!',"7h47 15 wr0n6, m8!\n(That is wrong, mate!)", message.channel) 
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