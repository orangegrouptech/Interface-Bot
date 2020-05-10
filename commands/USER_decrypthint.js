module.exports = {
    name: 'decrypthint',
    aliases: ['dechint', 'codecrackerhint', "cryptohint"],
    description: '**This is a game command.**\nStuck on a cryptogram? Use this command!\n(Make sure you run .cryptogram to get an encrypted message.)',
    usage: '(Cryptogram ID)',
    cooldown: 0,
    hidden:true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      const crypto = require('./crypt.json');
      const arg = message.content.slice('').trim().split(/ +/g);
      console.log(arg[1])
      var modified = arg[1] - 1
      const item = crypto[modified];
      const filter = response => {
        console.log(response)
        return item.answer
      }
      console.log(item)
      if(item === 'undefined')  {
        respond('Invalid Cryptogram ID','Please make sure you entered a valid Cryptogram ID.',message.channel)
        return
      } else if(item.cryptsystem === "Playfair Cipher"){
        respond('Cryptogram Hint','I heard you can use this cipher to decrypt this message... 🤔\n**' + item.cryptsystem + '**\n You are going to need this key: **' + item.key + "**", message.channel)
        return
      } else if(item.cryptsystem === "Blowfish Code"){
        respond('Cryptogram Hint','I heard you can use this cipher to decrypt this message... 🤔\n**' + item.cryptsystem + '**\n You are going to need this key: **' + item.key + "**", message.channel)
        return
      } else if(item.cryptsystem === "Affine Code"){
        respond('Cryptogram Hint','I heard you can use this cipher to decrypt this message... 🤔\n**' + item.cryptsystem + '**\n You are going to need these coordinates: \n**a = ' + item.a_parameter + "**\n**b = " + item.b_parameter + "**" , message.channel)
        return
      } else if(item.cryptsystem === "Vigenère Square Cipher"){
        respond('Cryptogram Hint','I heard you can use this cipher to decrypt this message... 🤔\n**' + item.cryptsystem + '**\n You are going to need this key: **' + item.key + "**", message.channel)
        return
      } else if(item.cryptsystem === "Two Letter Switcharoo Cipher"){
        respond('Cryptogram Hint','I heard you can use this cipher to decrypt this message... 🤔\n**' + item.cryptsystem + '**\n You are going to need to contact the creator of the cipher <@454579681602043916> for the guide.', message.channel)
        return
      } else if(item.cryptsystem === "Rotation Cipher"){
        respond('Cryptogram Hint','I heard you can use this cipher to decrypt this message... 🤔\n**' + item.cryptsystem + '**\n You are going to need this coordinate: \n**a = ' + item.a_parameter + "**", message.channel)
        return
      } else {
      respond('Cryptogram Hint','I heard you can use this cipher to decrypt this message... 🤔\n**' + item.cryptsystem + "**", message.channel)
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