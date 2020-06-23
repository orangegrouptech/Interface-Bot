module.exports = {
	name: 'help',
	description: 'List all available commands.',
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
					if(command.staff && command.staff == true && staffPerm == true || command.mod && command.mod == true && staffPerm == true){
							data.push(`__**${command.name}**__\n*${command.description || 'No information available.'}*`)
							helpEmbed.setFooter(`Staff | ${footerText}`)
					}
					if(!command.staff && !command.mod || command.mod == false || command.staff == false )
							data.push(`__**${command.name}**__\n*${command.description || 'No information available.'}*`)
				});
				if(data.join(' ').length > 2048){
					const newdata = []
					const newdataStaff = []
					await commands.forEach(element => {
						const command = element
						if(command.staff && command.staff == true && staffPerm == true || command.mod && command.mod == true && staffPerm == true){
							newdataStaff.push(`${command.name}`)
						}
						if(!command.staff && !command.mod || command.mod == false || command.staff == false )
							newdata.push(`${command.name}`)
					});
					await message.channel.send("```======Staff======\n"+newdataStaff.join('\n')+"```")
					return message.channel.send("```======User======\n"+newdata.join('\n')+"```")
				}
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