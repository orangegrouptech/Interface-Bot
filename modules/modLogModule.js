const config = require('../resources/config.json')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    description:"Handles mod log events.",
    async messageEdit(oldMessage, newMessage, client){
		if (newMessage.author.id === client.user.id) return;
		if(newMessage.content == oldMessage.content)return;
		let modLog = await client.channels.cache.get(config.modLog);
		let messageUpdateEmbed = new Discord.MessageEmbed()
		.setTitle("Message Edit")
		.setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
		.setDescription(`ID: ${oldMessage.author.id}\nChannel: <#${oldMessage.channel.id}> (${oldMessage.channel.id})\n[Jump to message](${"http://discord.com/channels/" + oldMessage.guild.id + "/" + oldMessage.channel.id + "/" + oldMessage.id})`)
		.addField("Original", oldMessage.content, true)
		.addField("Updated", newMessage, true)
		modLog.send(messageUpdateEmbed)
    },
    async messageDelete(message, client){
		if (message.author.id === client.user.id) return;
		let modLog = await client.channels.cache.get(config.modLog);
		let messageDeleteEmbed = new Discord.MessageEmbed()
		.setTitle("Message Delete")
		.setAuthor(message.author.tag, message.author.displayAvatarURL())
		.setDescription(`ID: ${message.author.id}\nChannel: <#${message.channel.id}> (${message.channel.id})`)
		.addField("Content", message.content, true)
		modLog.send(messageDeleteEmbed)
		if(fs.existsSync('./modules/debugLoggingModule.js')){
			let debugModule = require('./debugLoggingModule.js')
			return debugModule.log({action:"messageDelete", error:null, note:"modLog"})
		}
	},
	memberUpdate(oldMember, newMember, client){
		count = 0

		let oldNickname = oldMember ? oldMember.displayName : null;
		let newNickname = newMember ? newMember.displayName : null;
	
		const memberUpdateEmbed = new Discord.MessageEmbed()
		.setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL()}`)
		.setDescription(`ID: ${oldMember.user.id}`)

		if(oldMember.roles.cache.array().toString() != newMember.roles.cache.array().toString()){
			memberUpdateEmbed.addField('Role Update',`Previous: ${oldMember.roles.cache.array().toString()}\n\nUpdated: ${newMember.roles.cache.array().toString()}`, false)
			count = count+1
		}
		if(oldNickname != newNickname ){
			memberUpdateEmbed.addField('Nickname Update',`Previous: ${oldNickname}\nUpdated: ${newNickname}`, false)
			count = count+1
		}
	
		if(count != 0){
			const channel = client.channels.cache.get(`${config.modLog}`);
			channel.send(memberUpdateEmbed)
		}

		if(fs.existsSync('./modules/debugLoggingModule.js')){
			let debugModule = require('./debugLoggingModule.js')
			return debugModule.log({action:"memberUpdate", error:null, note:"modLog"})
		}
	}
}