module.exports = {
  name: 'hi',
  aliases: ['hello', 'hey'],
  description: 'Says hello. What else would it do? :joy:',
  cooldown: 0,
  staff:true,
	execute(message, args, client) {
    try{
   reply('', 'Hello! :wave:','', message.channel)
  }catch(error) {
    reply('Error', error + `\n\nDebug info: \nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    console.log(error);
    }
  }}