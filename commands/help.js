module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '',
	execute(message, args, client) {
		const data = [];
		const config = require('../resources/config.json')
		const { commands } = message.client;
		const { MessageEmbed } = require('discord.js')
		try {
			// code that might fail
			if (!args.length) {
				var modPerm = false

				if(message.member.roles.cache.some(role => role.id === `${config.staffRoleID}`)){
					var modPerm = true
				}

				const helpEmbed = new Discord.MessageEmbed()
				.setTitle('Available Commands')
				const helpEmbed2 = new Discord.MessageEmbed()
				const helpEmbed3 = new Discord.MessageEmbed()
				const helpEmbed4 = new Discord.MessageEmbed()
				const helpEmbed5 = new Discord.MessageEmbed()
				var helpEmbedEntryCount = 0

				if(!message.member.roles.cache.some(role => role.id === `${config.staffRoleID}`)){
					commands.forEach(element => {
						if(element.staff != true){
							helpEmbedEntryCount = helpEmbedEntryCount+1
							if(helpEmbedEntryCount < 25){
								helpEmbed.addField(command.name, command.description, false)
							}else if(helpEmbedEntryCount < 50)
							helpEmbed2.addField(command.name, command.description, false)
						}
						return message.channel.send(helpEmbed)
					})
				}else {
					commands.forEach(element => {
						helpEmbed.addField(element.name, element.description, false)						
					})
					return message.channel.send(helpEmbed)
				}
			}

			
		}catch(error) {
			respond('Error', error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}
		
	},
};