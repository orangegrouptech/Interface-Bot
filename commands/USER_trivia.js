module.exports = {
  name: 'trivia',
  aliases: ['factgame', 'triviagame'],
  description: '**This is a game command.**\nLearn something new with Apple Mod.\n(Trivia will only include history of the Apple company, the Apple Explained channel, the server and its users for now.)\nTo answer a question, use .answer (question ID) (your answer).',
  usage: '',
  cooldown: 0,
  hidden: true,
	execute(message, args, client) {
    const fs = require('fs');
    const Discord = require('discord.js')
    const msg = message
      if(args[0] == 'about' || args[0] == 'info'){
        const quiz = require('./quiz.json');
        var item = quiz[0];
        respond('Trivia', `__**About Trivia**__\nVersion: ${item.version}\nAuthor: ${item.author}`, message.channel, '', `QID: -`);
        return;
      }
    //Pick a question
    const quiz = require('./quiz.json');
    var item = quiz[Math.floor(Math.random() * quiz.length)];
    if(item.ignore && item.ignore == true){
      var item = quiz[Math.floor(Math.random() * quiz.length)];
    }
    const ans = item.answer
    const filter = response => {
      console.log(response)
      return item.answer
    }
    console.log(item)
        //Posts question and asks for response
        respond('Trivia',`<@${message.author.id}>'s question:\n` + item.question+ '\n' + item.choice1 + '\n' + item.choice2 +'\n' + item.choice3 + '\n' + item.choice4 + '\n' + "Question ID: " + item.qid, message.channel) 
        
        function responseReceived(result, responseMessage){
          if(result){
            console.log(item)
            responseMessage.delete().catch(err => {
              error(err)
            })
            if(result.toLowerCase() === item.answer) {
              respond('Correct!', `<@${message.author.id}>, that was the correct answer!`, message.channel, '29BF00', `QID: ${item.qid}`)
            }else if(result.toLowerCase() == ('a') || result.toLowerCase() == ('b') || result.toLowerCase() == ('c') || result.toLowerCase() == ('d')){
              reply('Wrong!', `<@${message.author.id}>, that was the wrong answer.`,`QID: ${item.qid}`, message.channel, 'BF0000')
            }else{
              reply('Invalid Response!', `<@${message.author.id}>, you gave an invalid response.`,`QID: ${item.qid}`, message.channel, 'ffff00')
            }
          }else{
            reply('', result, '', message.channel);
          }
        }

        awaitMessageResponse('', 'What is your answer?', '', message.channel, '', responseReceived, message.author) 
  }
}