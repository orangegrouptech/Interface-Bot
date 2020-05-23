console.log('Loading, please wait a moment.')
fs = require('fs');
colors = require('colors')
Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { 
	prefix, 
    token,
    staffRoleID,
    botLog,
	modLog,
	debugChannel
} = require('./config.json');
const config = require('./config.json')
const {
	MessageEmbed
} = require('discord.js')

version = '1.0.0'
//footerText = `Version ${version}`
footerText = `Debug Mode`


//Client Login
client.login(token)

//Bot Startup
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

debugLogging = function (text){
	const debugLoggingEmbed = new Discord.MessageEmbed()
		.setTitle('Debug Mode')
		.setDescription(text)
		.setTimestamp()
		.setFooter(footerText)
		client.channels.cache.get(`${config.debugChannel}`)
		.send(debugLoggingEmbed);
}


process.on('unhandledRejection', error => {
	console.error('Uncaught Promise Rejection:', error)
	if(debugChannel){
		debugLogging(`Uncaught Promise Rejection: ${err}`)
	}
});


//Response Embed
reply = function(title, content, footer, destination, color){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Invalid Arguments.`
		}else{
			RespondEmbed.setFooter(footer +' | '+ footerText)
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

prompt = async function(title, content, footer, destination, color, returnFunction){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Invalid Arguments.`
		}else{
			RespondEmbed.setFooter(footer +' | '+ footerText)
			if(color && !color == ''){
				RespondEmbed.setColor(color)
			}
			destination.send(RespondEmbed).then(message =>{
				const filter = (reaction, user) => {
					return ['✅', '❌'].includes(reaction.emoji.name) && user.id != message.author.id;
					};

				message.react('✅').then(() => message.react('❌'));
				
					message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
					.then(collected => {
						const reaction = collected.first();
						if (reaction.emoji.name === '✅') {
							returnFunction(true);
						}
						if (reaction.emoji.name === '❌') {
							returnFunction(false);
						}
					})
					.catch(collected => {
						returnFunction('No response was found.');
					});
			})
		} 
    }catch(err){
        throw err
    }
}

awaitMessageResponse = async function(title, content, footer, destination, color, returnFunction, messageAuthor){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Invalid Arguments.`
		}else{
			RespondEmbed.setFooter(footer +' | '+ footerText)
			if(color && !color == ''){
				RespondEmbed.setColor(color)
			}
			destination.send(RespondEmbed).then(botmessage =>{
				const filter = response => {
					console.log(response.content)
					return response.content && response.author.id == messageAuthor.id
					};
				
					botmessage.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
					.then(collected => {

						returnFunction(collected)
					})
					.catch(collected => {
						console.log(collected)
						returnFunction('No response was found.');
						error(collected)
					});
			})
		} 
    }catch(err){
        throw err
    }
}

//Respond backward compatibility
respond = function (title, content, sendto, color, footer, imageurl){
	console.log(colors.red(`WARNING: You are currently using old code. (respond)`));
	console.log(colors.red(`WARNING: Please update your code.`));
	console.log(colors.red(`WARNING: This backward compatibility will be removed eventually.`));
	if(!color){
		var color = ''
	}
	if(!footer){
		var footer = ''
	}
	reply(title, content, footer, sendto, color)
}

//Error Logging
error = function (error){
	const errorReportEmbed = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle('Bot Error')
		.setDescription(error)
		.setTimestamp()
		.setFooter(footerText)
		client.channels.cache.get(`${botLog}`)
		.send(errorReportEmbed);
}

//Commands
const commandFiles = fs.readdirSync('./commands')
.filter(file => file.endsWith('.js'));

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

	if(debugChannel){
		debugLogging(`commandName: ${command.name}\nargs: ${args}\nMessage content: ${message.content}`)
	}

	if(command.staff == true && !message.member.roles.cache.some(role => role.id === `${staffRoleID}`)){
		reply('', `Incorrect permissions. Required role: <@&${staffRoleID}>`, '', message.channel);
		return;
	}
	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		error(error)
	}
});

