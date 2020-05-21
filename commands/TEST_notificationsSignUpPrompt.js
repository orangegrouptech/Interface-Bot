module.exports = {
  name: "signup",
    async execute(message, args, client) {
        if(prompt('', 'Are you sure you want to sign up for news notifications?', '', message.channel) === true){
          reply('', 'Thank you for signing up!', '', message.channel)
        } else if(prompt('', 'Are you sure you want to sign up for news notifications?', '', message.channel) === false){
          reply('', 'Hope you sign up next time!', '', message.channel)
        }
      }
    }