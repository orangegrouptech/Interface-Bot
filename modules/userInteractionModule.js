const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
const fs = require('fs')
module.exports = {
    description:"Handles user interactions",
    async awaitResponse(message, client, returnFunction, givenOptions){
        //Waits for the user to send a message 
    try{
        let options = await JSON.parse(JSON.stringify(givenOptions))
        let authorInfo = options["author"] ?JSON.parse(JSON.stringify(options["author"])):false
        //File check
        if(!options.title && !options.content && !options.footer)
                throw 'Invalid options'
        // END File check
        const promptEmbed = new Discord.MessageEmbed()
        .setAuthor(authorInfo["name"] || "", authorInfo["imageURL"] || "")
        .setTitle(options.title || "")
        .setDescription(options.content || "")
        .setFooter(options.footer ? options.footer+' | '+footerText:footerText)
        .setColor(options.color || "")
        .setImage(options.imageURL || "")
        .setThumbnail(options.thumbnailURL || "")
        let destination = options.destination ?client.channels.cache.get(options.destination) : message.channel

        let timeToWait = options.wait || 60000
			destination.send(promptEmbed).then(botmessage =>{
				if(!timeToWait){
					timeToWait = 60000;
				}
				const filter = response => {
					console.log(response.content)
					responseContent = response.content
					responseMessage = response
					return response.content && response.author.id == message.author.id
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
    }catch(err){
        if(fs.existsSync('./modules/debugLoggingModule.js')){
            let debugModule = require('./debugLoggingModule.js')
            return debugModule.log({action:"error", error:err, note:"userInteraction"})
    }
        throw err
    }
    },
    async prompt(message, client, returnFunction, givenOptions){
        try{
            let options = JSON.parse(JSON.stringify(givenOptions))
            let authorInfo = options["author"] ?JSON.parse(JSON.stringify(options["author"])):false
        try{
            //File check
            if(!options.title && !options.content && !options.footer)
                    throw 'Invalid options'
            // END File check
            const promptEmbed = new Discord.MessageEmbed()
            .setAuthor(authorInfo["name"] || "", authorInfo["imageURL"] || "")
            .setTitle(options.title || "")
            .setDescription(options.content || "")
            .setFooter(options.footer ? options.footer+' | '+footerText:footerText)
            .setColor(options.color || "")
            .setImage(options.imageURL || "")
            .setThumbnail(options.thumbnailURL || "")
            let destination = options.destination ?client.channels.cache.get(options.destination) : message.channel

            let timeToWait = options.wait || 60000

                 destination.send(promptEmbed).then(botMessage =>{
                     const filter = (reaction, user) => {
                         return ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;
                         };
     
                         botMessage.react('✅').then(() => botMessage.react('❌'));
                     
                         botMessage.awaitReactions(filter, { max: 1, time: Number(timeToWait), errors: ['time'] })
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
             }catch(err){
                 error(err)
                 if(fs.existsSync('./modules/debugLoggingModule.js')){
                    let debugModule = require('./debugLoggingModule.js')
                    return debugModule.log({action:"error", error:err, note:"userInteraction"})
            }
             }
         }catch(err){
            if(fs.existsSync('./modules/debugLoggingModule.js')){
                let debugModule = require('./debugLoggingModule.js')
                return debugModule.log({action:"error", error:err, note:"userInteraction"})
        }
             throw err
         }
    },
    async reactOptions(message, client, returnFunction, givenOptions){
            let options = await JSON.parse(JSON.stringify(givenOptions))
            let authorInfo = options["author"] ?JSON.parse(JSON.stringify(options["author"])):false
        try{
            //File check
            if(!options.title && !options.content && !options.footer || !options.emojis)
                    throw 'Invalid options'
            // END File check
            const promptEmbed = new Discord.MessageEmbed()
            .setAuthor(authorInfo["name"] || "", authorInfo["imageURL"] || "")
            .setTitle(options.title || "")
            .setDescription(options.content || "")
            .setFooter(options.footer ? options.footer+' | '+footerText:footerText)
            .setColor(options.color || "")
            .setImage(options.imageURL || "")
            .setThumbnail(options.thumbnailURL || "")
            let destination = options.destination ?client.channels.cache.get(options.destination) : message.channel

            let timeToWait = options.wait || 60000

                destination.send(promptEmbed).then(async botMessage =>{
                     let filter = (reaction, user) => {
                         return options["emojis"].includes(reaction.emoji.name) && user.id == message.author.id || options["emojis"].includes(reaction.emoji.id) && user.id == message.author.id;
                         };
     
                         options["emojis"].forEach(async element => {
                         await botMessage.react(element)
                        });
                     
                        botMessage.awaitReactions(filter, { max: 1, time: Number(timeToWait), errors: ['time'] })
                         .then(collected => {
                             const reaction = collected.first();
                             returnFunction(reaction)
                         })
                         .catch(collected => {
                             returnFunction(null);
                         });
                 }) 
         }catch(err){
            if(fs.existsSync('./modules/debugLoggingModule.js')){
                let debugModule = require('./debugLoggingModule.js')
                return debugModule.log({action:"error", error:err, note:"userInteraction"})
        }
             throw err
         }
         
    },
    async testJsonSettings(options){
        const json = JSON.parse(JSON.stringify(options))
        console.log(json)
    }
}