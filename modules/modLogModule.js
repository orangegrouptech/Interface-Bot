const config = require('../resources/config.json')
const Discord = require('discord.js')
module.exports = {
    description:"Handles mod log events.",
    async messageEdit(oldMessage, newMessage, client){
		if (newMessage.author.id === client.user.id) return;
		let modLog = await client.channels.cache.get(config.modLog);
		let messageUpdateEmbed = new Discord.MessageEmbed()
		.setTitle("Message Edit")
		.setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
		.setDescription(`ID: ${oldMessage.author.id}\nChannel: <#${oldMessage.channel.id}> (${oldMessage.channel.id})`)
		.addField("Original Message", oldMessage.content, true)
		.addField("Updated Message", newMessage, true)
		modLog.send(messageUpdateEmbed)
    },
    async messageDelete(message, client){
		if (message.author.id === client.user.id) return;
		let modLog = await client.channels.cache.get(config.modLog);
		let messageDeleteEmbed = new Discord.MessageEmbed()
		.setTitle("Message Delete")
		.setAuthor(message.author.tag, message.author.displayAvatarURL())
		.setDescription(`ID: ${message.author.id}\nChannel: <#${message.channel.id}> (${message.channel.id})`)
		.addField("Message", message.content, true)
		modLog.send(messageDeleteEmbed)
    }
}