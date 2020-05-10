module.exports = {
    name: 'cryptogram',
    aliases: ['crypt', 'codecracker'],
    description: '**This is a game command.**\nTest your decoding skills with this game!\n*(Disclaimer: Apple Moderator will NOT be speaking in robot for this one.)*',
    usage: '',
    cooldown: 0,
    hidden:true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      //Pick a cryptogram
      const crypto = require('./crypt.json');
      const item = crypto[Math.floor(Math.random() * crypto.length)];
      const filter = response => {
        console.log(response)
        return item.answer
      }
      console.log(item)
          respond('Cryptogram',"<@"+ message.author.id + ">'s cryptogram\n" + item.cryptogram + "\nCryptogram ID: " + item.cryptoid + "\nAnswer using .decrypt (Cryptogram ID) (answer in one word).\nType .decrypthint (Cryptogram ID) for a hint.", message.channel) 
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }