module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '',
	async execute(message, args, client) {
		const Discord = require('discord.js')
		const data = [];
		const config = require('../resources/config.json')
		const { commands } = message.client;
		const { MessageEmbed } = require('discord.js')
		try {
			// code that might fail
			if (!args.length) {
				var staffPerm = false

				if(message.member.roles.cache.some(role => role.id === `${config.staffRoleID}`)){
					var staffPerm = true
				}

				const helpEmbed = new Discord.MessageEmbed()
				.setTitle('Available Commands')
				var commandCount = 0
				await commands.forEach(element => {
					commandCount = commandCount +1
					const command = element
					if(command.staff && command.staff == true && staffPerm == true){
							data.push(`__**${command.name}**__\n*${command.description || 'No information available.'}*`)
							helpEmbed.setFooter('Staff')
					}
					if(!command.staff || command.staff == false)
							data.push(`__**${command.name}**__\n*${command.description || 'No information available.'}*`)
				});
				helpEmbed.setDescription(data.sort(function (a, b){
					if (a < b) return -1;
					else if (a > b) return 1;
					return 0;
				}))
				if(commandCount == 1){
					helpEmbed.setDescription(`Looks like you haven't added any commands yet!\nAdd some to the commands folder. Some working commands you can use are in the \`workingCommands\` folder.`)
				}
				return message.channel.send(helpEmbed)
			}

			
		}catch(error) {
			respond('Error', error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}
		
	},
};