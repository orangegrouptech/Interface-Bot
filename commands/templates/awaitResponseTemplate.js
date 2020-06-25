module.exports = {
  name: 'react',
	execute(message, args, client) {
    returnFunction = function(result){
      switch (result){
        case result:
          return reply('', result, '', message.channel)
        default:
          return reply('', 'Something went wrong!', '', message.channel)
      }
    }
    const userInteraction = require('../modules/userInteractionModule.js')
    const options = 
    {
      title:"",
      content:"hmm",
      footer:"",
      wait:60000
    }
    userInteraction.awaitResponse(message, client, returnFunction, options)
  }
}