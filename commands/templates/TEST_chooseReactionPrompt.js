module.exports = {
  name: "choose",
  description:"Choose an item!",
    async execute(message, args, client) {
        function responseReceived(result){
          if(result != null){
            reply('', 'You responded with '+ result.emoji.name, '', message.channel)
          }else{
            reply('', 'No response was given! (null)', '', message.channel);
          }
        }
        array = ["⬅️", "⬆️", "⬇️", "➡️"]
        reactOptions('', 'Choose an arrow!', '', message.channel, array, '', responseReceived, message.author)
        }
    }