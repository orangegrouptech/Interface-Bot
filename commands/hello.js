module.exports = {
  name: 'hi',
  aliases: ['hello', 'hey'],
  description: 'Says hello. What else would it do? :joy:',
  usage: 'N/A',
  cooldown: 0,
	execute(message, args, client) {
    try{
   respond('', 'Hello! :wave:','', message.channel)
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    console.log(error);
    }
  }}