module.exports = {
    name: 'ban',
    description: 'Bans a user.',
    aliases: ['banish'],
	usage: '<user> <reason>',
	cooldown: 0,
	staff:true,
    execute(message, args, client) {
		config = require('../resources/config.json')
		mentionedMember = message.mentions.members.first()
        try {
			if(!mentionedMember){
				reply('','Please mention a user.', '', message.channel)
			}
			if (message.author.id == mentionedMember.id){
				reply('',`You can't perform this action on yourself.`,'', message.channel);
				return;
			}
			if (mentionedMember.roles.cache.some(role => role.id === `${config.staffRoleID}`)){
				reply('',`You can't perform this action on this user.`,'', message.channel);
				return;
			}
			const guild = message.guild
			var reason = args.join(' ').replace(args[0], '')
			if(reason == ''){
			var reason = 'No reason provided.'
			}
			reply('Ban',`<@${mentionedMember.id}> was banned.\nReason: ${reason}`,'', message.channel)
			reply('Banned','You were banned from the server due to: '+ reason,'', mentionedMember)
			mentionedMember.ban({reason: reason})
        	}catch(error) {
				respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
				}
    },
};
