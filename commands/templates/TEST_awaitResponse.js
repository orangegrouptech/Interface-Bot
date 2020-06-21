module.exports = {
  name: "repeatme",
    async execute(message, args, client) {
        function responseReceived(result){
          if(result != null){
            reply('', result, '', message.channel);
          }else{
            reply('', 'Something went wrong! Maybe you didn\'t respond?', '', message.channel);
          }
        }
        awaitMessageResponse('', 'What do you want me to say?', '', message.channel, '', responseReceived, message.author)
        }
    }