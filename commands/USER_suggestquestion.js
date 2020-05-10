module.exports = {
    name: 'suggestquestion',
    aliases: ['triviaadd', 'addtrivia', 'addquestion', 'questionadd'],
    description: 'Suggests a question for the .trivia command. (Question only!)',
    usage: '(question)',
    cooldown: 30,
    hidden: true,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      const argarray = message.content.slice().trim().split(/ +/g);
      const config = require('../config.json')
      var text = args.join(' ');
      console.log(text)
      console.log("If you see undefined, check code!")
      console.log("If you see the question here but it spits out 'no question found', check code!")
      try {
        respond('New question suggestion', 'A .trivia question has been sent for your review.\n' + text, message.guild.members.cache.get('454579681602043916'), 'FFFFFF', `${message.author.tag} | ${message.author.id}`)
        respond('Suggestion sent!','Your question has been sent to the developer of '+config.prefix+'trivia and is now under review!', message.channel, '29BF00', `${message.author.tag} | ${message.author.id}`)
        message.delete()
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}