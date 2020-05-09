console.log('Loading, please wait a moment.')
fs = require('fs');
Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { 
	prefix, 
    token,
    staffRoleID,
    botLog,
    modLog
} = require('./config.json');
const {
	MessageEmbed
} = require('discord.js')

version = '1.0.0'
//footerText = `Version ${version}`
footerText = `Debug Mode`

//Bot ready
client.once('ready', () => {
	console.log('Version '+version)
    console.log('Ready.');
    const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Bot Started')
		.setTimestamp()
		.setFooter(footerText)
	client.channels.cache.get(`${botLog}`).send(StartupEmbed);

});

//Response Embed
respond = function(title, content, footer, destination, color){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Missing Arguments.`
		}else{
			RespondEmbed.setFooter(footer + footerText)
			if(color && !color == ''){
				RespondEmbed.setColor(color)
			}
			destination.send(RespondEmbed).then(message =>{
				return message //Returns the message object
			})
		} 
    }catch(err){
        throw err
    }
    
}

//Commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
		if(!command.mod){
			client.commands.set(command.name, command);
		}
	}
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		return;
	}
	if(command.staff == true && !message.member.roles.cache.some(role => role.id === `${staffRoleID}`)){
		respond('', `Incorrect permissions. Required role: <@&${staffRoleID}>`, '', message.channel);
		return;
	}
	try {
		command.execute(message, args, client, this);
	} catch (error) {
		console.error(error);
		respond('','Error: '+error, '',message.channel, 'ff0000')
	}
});


process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
client.login(token)