module.exports = {
  name: "signup",
    async execute(message, args, client) {
        function responseReceived(result){
          if(result == true){
            reply('', 'Thank you for signing up!', '', message.channel)
          }else if(result == false){
            reply('', 'Hope you sign up next time!', '', message.channel)
          }else if(result != true && result != false){
            reply('', result, '', message.channel);
          }
        }
        prompt('', 'Are you sure you want to sign up for news notifications?', '', message.channel, '', responseReceived, message.author)
        }
    }