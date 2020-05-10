module.exports = {
    name: 'bugreport',
    aliases: ['bug', 'report', 'problemreport', 'squashbug'],
    description: 'Eek! Did you find a bug? Tell us and we will squash it!',
    usage: '(problematic command) (details of bug report)',
    cooldown: 15,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      const argarray = message.content.slice().trim().split(/ +/g);
      var command = argarray[1]
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      var reason = reasonraw.join(' ')
      var reason = reason.replace(argarray[1], ' ')
      console.log(command)
      console.log(reason)
      console.log("If you see undefined, check code!")
      console.log("If you see the question here but it spits out 'no bug found', check code!")
      try {
        respond('Bug Report', 'A user has reported a problem with the following command:\n**' + command + '**\nHere is their report: \n' + reason , message.guild.members.cache.get('454579681602043916'), 'd90e00', "\nDerpi and Daniel also got the message. Meet up in the dev server to assign a bugfixer.\n" + `${message.author.tag} | ${message.author.id}`)
        respond('Bug Report', 'A user has reported a problem with the following command:\n**' + command + '**\nHere is their report: \n' + reason , message.guild.members.cache.get('461560462991949863'), 'd90e00', "\nThomas and Derpi also got the message. Meet up in the dev server to assign a bugfixer.\n" + `${message.author.tag} | ${message.author.id}`)
        respond('Bug Report', 'A user has reported a problem with the following command:\n**' + command + '**\nHere is their report: \n' + reason , message.guild.members.cache.get('595397105103667236'), 'd90e00', "\nThomas and Daniel also got the message. Meet up in the dev server to assign a bugfixer.\n" + `${message.author.tag} | ${message.author.id}`)
        respond('Report sent!','Your bug report has been sent to the bot developers and will be fixed soon!', message.channel, '29BF00', `${message.author.tag} | ${message.author.id}`)
        message.delete()
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}