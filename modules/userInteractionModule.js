module.exports = {
    description:"Handles user interactions",
    awaitResponse(title, content, footer, destination, color, returnFunction, messageAuthor, timeToWait = 60000){
        //Waits for the user to send a message 
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
    },
    prompt(title, content, footer, destination, color, returnFunction, messageAuthor, timeToWait = 60000){
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
    },
    async reactOptions(title, content, footer, destination, array, color = '', returnFunction, message, timeToWait = 60000){
        //Title:String, Content:String, Footer:String, Destination:Channel/DM, Array:[], Color:Hex, ReturnFunction:Function, Message:Message Object, TimeToWait:Number(milliseconds)
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
                         return array.includes(reaction.emoji.name) && user.id == message.author.id || array.includes(reaction.emoji.id) && user.id == message.author.id;
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
    },
    async testJsonSettings(options){
        const json = JSON.parse(JSON.stringify(options))
        console.log(json)
    }
}