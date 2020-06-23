module.exports = {
  name: 'react',
	execute(message, args, client) {
    returnFunction = function(result){
      switch (result){
        case true:
          return reply('', 'Accepted', '', message.channel)
        case false:
          return reply('', 'Declined!', '', message.channel)
        default:
          return reply('', 'Something went wrong!', '', message.channel)
      }
    }
    const userInteraction = require('../modules/userInteractionModule.js')
    const options = 
    {
      title:"Test Title",
      content:"Yeet",
      footer:"Footer",
      destination:message.channel.id,
      emojis:["✅", "❌", "💃", "👋"],
      wait:10000
    }
    userInteraction.prompt(message, client, returnFunction, options)
  }
}