module.exports = {
    execute(message){
			if(message.channel.type == 'dm')return;
				const blacklist = require('../resources/blacklisted.json');
				var caught = blacklist.filter(word => message.content.toLowerCase().includes(word));
				if (caught.length > 0) {
					message.delete()
					reply('Blacklisted text', `<@${message.author.id}>, your message included a blacklisted word, so it was deleted.`, '', message.channel)
					reply('Blacklisted text', `Your message included a blacklisted word, so it was deleted. The blacklisted word is: ${caught}`, '', message.author)
                }
    }
}