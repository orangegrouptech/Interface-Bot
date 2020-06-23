module.exports = {
  name: 'avatar',
  aliases: ['getavatar'],
  description: 'Gets someones avatar.',
  usage: '<user>',
  cooldown: 0,

	async execute(message, args, client) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    try{
      const member = await message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get('name', args[0]) || message.author;
      if(message.guild.members.cache.get('name', args[0]) || message.guild.members.cache.get(args[0]))
          icon = member.user.displayAvatarURL({ dynamic: true });
        else
        icon = member.displayAvatarURL();
      const name = member.tag || member.user.tag
      const AvatarEmbed = new Discord.MessageEmbed()
      .setTitle(name+'\'s Avatar')
      .setImage(`${icon}`)
      message.channel.send(AvatarEmbed)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
  }}