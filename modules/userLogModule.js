const config = require('../resources/config.json')
module.exports = {
    description:"Handles member join/leave events.",
    userJoin(member){
        const MemberJoinEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Member Join')
		.setThumbnail(`${member.user.displayAvatarURL()}`)
		.addFields(
			{ name: 'Member', value: `<@${member.id}>`, inline: true },
			{ name: 'Username', value: member.user.tag, inline: true },
			{ name: 'ID', value: member.id, inline: true },
			{ name: 'Account creation', value: member.user.createdAt, inline: false },
		)
        .setTimestamp()
        const channel = member.guild.channels.cache.get(config.userLog)
		channel.send(MemberJoinEmbed)
    },
    userLeave(member){
        const MemberJoinEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Member Leave')
		.setThumbnail(`${member.user.displayAvatarURL()}`)
		.addFields(
			{ name: 'Member', value: `<@${member.id}>`, inline: true },
			{ name: 'Username', value: member.user.tag, inline: true },
			{ name: 'ID', value: member.id, inline: true },
			{ name: 'Account creation', value: member.user.createdAt, inline: false },
			{ name: 'Role list', value: member.roles.cache.array().toString(), inline: false },
		)
        .setTimestamp()
        const channel = member.guild.channels.cache.get(config.userLog)
		channel.send(MemberJoinEmbed)
    }
}