module.exports = {
  name: "waitfor",
    async execute(message, args, client) {
        function responseReceived(result){
          if(result != null){
            reply('', result, 'You responded!', message.channel);
          }else{
            reply('', 'Something went wrong! Maybe you didn\'t respond?', '', message.channel);
          }
        }
        awaitMessageResponse('', 'You said to wait for '+args[0], '', message.channel, '', responseReceived, message.author, args[0])
        }
    }