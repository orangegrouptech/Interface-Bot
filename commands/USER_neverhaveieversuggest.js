module.exports = {
    name: 'neverhaveieversuggest',
    aliases: ['nhiesuggest', 'neversuggest', 'nevereversuggest', 'neveradd', 'addnever', 'nevereveradd', 'addneverever', 'nhieadd', 'addnhie'],
    description: 'Suggests a statement for the .neverhaveiever command.',
    usage: '(your Never have I ever statement)',
    cooldown: 10,
    hidden:true,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      const argarray = message.content.slice().trim().split(/ +/g);
      const config = require('../config.json')
      var text = args.join(' ');
      console.log(text)
      console.log("If you see undefined, check code!")
      try {
        respond('New "Never have I ever" suggestion', 'A "Never have I ever" statement has been sent for your review.\n' + text, message.guild.members.cache.get('454579681602043916'), 'FFFFFF')
        respond('Suggestion sent!','Your Never have I ever statement has been sent to the developer of '+config.prefix+'neverhaveiever and is now under review!', message.channel, '29BF00')
        message.delete()
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}