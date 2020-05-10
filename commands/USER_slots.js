module.exports = {
    name: 'slots',
    aliases: ['slotmachine', 'vegas'],
    description: '**This is a game command.**\nPlay on a slot machine like in Vegas.\n(No gambling included)',
    usage: '',
    cooldown: 0,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
         var roll1 = Math.ceil(Math.random() * 99)
         console.log("Slot 1 generated. " + roll1)
         var roll2 = Math.ceil(Math.random() * 99)
         console.log("Slot 2 generated. " + roll2)
         var roll3 = Math.ceil(Math.random() * 99)
         console.log("Slot 3 generated. " + roll3)
         var slot1 = roll1
         console.log("Slot 1 transferred. " + slot1)
         var slot2 = roll2
         console.log("Slot 2 transferred. " + slot2)
         var slot3 = roll3
         console.log("Slot 3 transferred. " + slot3)
         console.log("Checking if slot1 matches slot2 and slot3...")
          if (roll1 === roll2 === roll3) {
            console.log("Match. Win.")
            respond('Slots', "<@" + message.author.id + ">'s slot game:\n" + slot1 + "   " + slot2 + "   " + slot3 + "\n" + "You win this one!\nThink carefully before you gamble in real life Vegas.\nThe .slots command is only a simulation." , message.channel)
            return
            } else {
            console.log("Mismatch. Lose.")
            respond('Slots', "<@" + message.author.id + ">'s slot game:\n" + slot1 + "   " + slot2 + "   " + slot3 + "\n" + "You lose this one.\nIf you want to gamble in Vegas, it's a bad idea for you." , message.channel)
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