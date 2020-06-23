const config = require('../resources/config.json')
const featureConfig = require('../resources/featuresConfig.json')
const Discord = require('discord.js')
module.exports = {
	description:"Handles bot log events.",
	errorLog(error, client){
		if(featureConfig.botLog == true){
			errorReportEmbed = new Discord.MessageEmbed()
				.setColor('#FF0000')
				.setTitle('Bot Error')
				.setDescription(error)
				.setTimestamp()
				.setFooter(footerText)
				client.channels.cache
				.get(`${config.botLog}`)
				.send(errorReportEmbed);
		}
	},
	botStart(client){
		if(featureConfig.botLog == true){
			StartupEmbed = new Discord.MessageEmbed()
			.setColor('#00FF00')
			.setTitle('Bot Started')
			.setTimestamp()
			.setFooter(footerText)
			client.channels.cache
			.get(`${config.botLog}`)
			.send(StartupEmbed);
		}
		console.log('Bot started successfully.')
	},
	debugLogging(text, client){
			debugLoggingEmbed = new Discord.MessageEmbed()
				.setTitle('Debug Mode')
				.setDescription(text)
				.setTimestamp()
				.setFooter(footerText)
				client.channels.cache
				.get(`${config.debugChannel}`)
				.send(debugLoggingEmbed);
	}
}