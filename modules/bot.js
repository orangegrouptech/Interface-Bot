const { messageDelete } = require('./modLogModule.js');

//Run app.js first.
module.exports = {
	execute(){
fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


const config = require('../resources/config.json')
const featureConfig = require('../resources/featuresConfig.json')

const {
	MessageEmbed
} = require('discord.js')

version = '1.0.0'
//footerText = `Version ${version}`
footerText = `Debug Mode`
console.log('Version '+ version)


//Client Login
client.login(config.token).catch(err => {
	console.log('Something went wrong while attempting to log you in!\nMake sure the provided token is valid.\n'+err);
	return process.exit()
})

//Bot Startup
client.once('ready', () => {
	const botLogModule = require('./botLogModule.js')
	botLogModule.botStart(client)
});

//Error
error = function(error){
	const botLogModule = require('../modules/botLogModule.js')
	botLogModule.errorLog(error, client)
	
}

//Debug logging
debugLogging = function (text){
	const botLogModule = require('./botLogModule.js')
	botLogModule.debugLogging(text, client)
}

//Response Embed
reply = function(title, content, footer, destination, color){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Invalid Arguments.`
		}else{
			if(!footer == ''){
			RespondEmbed.setFooter(footer +' | '+ footerText)
			}else{
				RespondEmbed.setFooter(footerText)
			}
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

//Gives user an option through reactions: ✅ (Yes), ❌ (No)
prompt = async function(title, content, footer, destination, color, returnFunction, messageAuthor, timeToWait = 60000){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Invalid Arguments.`
		}else{
			if(!footer == ''){
				RespondEmbed.setFooter(footer +' | '+ footerText)
			}else{
				RespondEmbed.setFooter(footerText)
			}
			if(color && !color == ''){
				RespondEmbed.setColor(color)
			}
			destination.send(RespondEmbed).then(message =>{
				const filter = (reaction, user) => {
					return ['✅', '❌'].includes(reaction.emoji.name) && user.id == messageAuthor.id;
					};

				message.react('✅').then(() => message.react('❌'));
				
					message.awaitReactions(filter, { max: 1, time: Number(timeToWait), errors: ['time'] })
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

//User can select through reactions (Provided through array)
reactOptions = async function(title, content, footer, destination, array, color = '', returnFunction, messageAuthor, timeToWait = 60000){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Invalid Arguments.`
		}else{
			if(!footer == ''){
				RespondEmbed.setFooter(footer +' | '+ footerText)
				}else{
					RespondEmbed.setFooter(footerText)
				}
			if(color && !color == ''){
				RespondEmbed.setColor(color)
			}
			destination.send(RespondEmbed).then(async message =>{
				const filter = (reaction, user) => {
					return array.includes(reaction.emoji.name) && user.id == messageAuthor.id || array.includes(reaction.emoji.id) && user.id == messageAuthor.id;
					};

				array.forEach(async element => {
					await message.react(element)
				});
				
					await message.awaitReactions(filter, { max: 1, time: Number(timeToWait), errors: ['time'] })
					.then(collected => {
						const reaction = collected.first();
						returnFunction(reaction)
					})
					.catch(collected => {
						returnFunction(null);
					});
			})
		} 
    }catch(err){
        throw err
    }
}

//Waits for the user to send a message 
awaitMessageResponse = async function(title, content, footer, destination, color, returnFunction, messageAuthor, timeToWait = 60000){
    try{
       var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!destination || destination == '' ){
			throw `Invalid Arguments.`
		}else{
			if(!footer == ''){
				RespondEmbed.setFooter(footer +' | '+ footerText)
				}else{
					RespondEmbed.setFooter(footerText)
				}
			if(color && !color == ''){
				RespondEmbed.setColor(color)
			}
			destination.send(RespondEmbed).then(botmessage =>{
				if(!timeToWait){
					timeToWait = 60000;
				}
				const filter = response => {
					console.log(response.content)
					responseContent = response.content
					responseMessage = response
					return response.content && response.author.id == messageAuthor.id
					};
				
					botmessage.channel.awaitMessages(filter, { max: 1, time: Number(timeToWait), errors: ['time'] }) //60 seconds by default
					.then(collected => {
						returnFunction(responseContent, responseMessage)
					})
					.catch(collected => {
						console.log(collected)
						returnFunction(null);
					});
			})
		} 
    }catch(err){
        throw err
    }
}

//Respond function backwards compatibility
respond = function (title, content, sendto, color, footer, imageurl){
	console.log(`=================================================================`);
	console.log(`WARNING: You are currently using old functions. (respond)`);
	console.log(`WARNING: Please update your code to use the new function. (reply)`);
	console.log(`WARNING: This backward compatibility will be removed eventually.`);
	console.log(`=================================================================`);
	if(!color){
		var color = ''
	}
	if(!footer){
		var footer = ''
	}
	reply(title, content, footer, sendto, color)
}


//Debug
process.on('unhandledRejection', error => {
	console.error('Uncaught Promise Rejection:', error)
	if(config.debugChannel){
		debugLogging(`Uncaught Promise Rejection: ${error}`)
	}
});

//Commands
const commandFiles = fs.readdirSync('./commands')
.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.name, command);
	}
	
client.on('message', async message => {
	//Put a module called "commandHandler.js" in "modules/" to override built in command handler
	if(fs.existsSync('./modules/commandHandler.js')){
		const commandHandler = require('./commandHandler.js')
		return commandHandler.execute(message, client)
	}
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
		const args = message.content.slice(config.prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		return;
	}

	if(config.debugChannel){
		debugLogging(`commandName: ${command.name}\nargs: ${args}\nMessage content: ${message.content}`)
	}

	if(command.staff == true && !message.member.roles.cache.some(role => role.id === `${config.staffRoleID}`)){
		reply('', `Incorrect permissions. Required role: <@&${config.staffRoleID}>`, '', message.channel);
		return;
	}

	try {
		command.execute(message, args, client);
	} catch (err) {
		console.error(err);
		error(err)
	}
});

//Blacklisted text
client.on('message', message => {
	if(featureConfig.blacklistedWordsFilter == true){
	const messageFilter = require('./messageFilterModule.js')
	return messageFilter.execute(message)
	}
})

//Member Join
client.on('guildMemberAdd', member => {
	if(featureConfig.userLog == true){
		const userLogModule = require('./userLogModule.js')
		return userLogModule.userJoin(member)
	}
})

//Member leave
client.on('guildMemberRemove', member => {
	if(featureConfig.userLog == true){
		const userLogModule = require('./userLogModule.js')
		return userLogModule.userLeave(member)
	}
})

//Message Update
client.on("messageUpdate", async (oldMessage, newMessage) => {
	if(featureConfig.modLog == true && featureConfig.modLog_messageEdit == true){
		const modLogModule = require('./modLogModule.js')
		return modLogModule.messageEdit(oldMessage, newMessage, client)
	}
})

//Message Delete
client.on("messageDelete", async (message) => {
	if(featureConfig.modLog == true && featureConfig.modLog_messageDelete == true){
		const modLogModule = require('./modLogModule.js')
		return modLogModule.messageDelete(message, client)
	}
})

	}
}