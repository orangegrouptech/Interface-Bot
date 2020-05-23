module.exports = {
  name: "repeatme",
    async execute(message, args, client) {
        function responseReceived(result){
          if(result){
            reply('', result, '', message.channel);
          }else{
            reply('', result, '', message.channel);
          }
        }
        awaitMessageResponse('', 'What do you want me to say?', '', message.channel, '', responseReceived, message.author)
        }
    }