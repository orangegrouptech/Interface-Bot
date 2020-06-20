module.exports = {
  name: 'trivia',
  aliases: ['factgame', 'triviagame'],
  description: 'Learn something new!',
  usage: '',
  cooldown: 0,
  hidden: true,
	execute(message, args, client) {
    const fs = require('fs');
    const Discord = require('discord.js')
    const msg = message
      if(args[0] == 'about' || args[0] == 'info'){
        const quiz = require('../resources/quiz.json');
        var item = quiz[0];
        respond('Trivia', `__**About Trivia**__\nVersion: ${item.version}\nAuthor: ${item.author}`, message.channel, '', `QID: -`);
        return;
      }
    //Pick a question
    const quiz = require('../resources/quiz.json');
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
          if(result != null){
            console.log(item)
            if(responseMessage){
            responseMessage.delete().catch(err => {
              error(err)
            })
          }
            if(result.toLowerCase() === item.answer) {
              fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
                if(error) {
                  console.log("answer correct. no leaderboard update.")
                  respond('Correct!', '<@' + message.author.id + '>, that was the correct answer!\nIf you want to compete in the leaderboards, type `leaderboard init`.', message.channel, '29BF00', `QID: ${item.qid}`)
                  message.delete()
                  return
                } else {
                  console.log('answer correct')
                  jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
                  jsonfile.triviawins = Number(jsonfile.triviawins)+1;
                  data = JSON.stringify(jsonfile)
                  fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
                      if (err) throw err;
                      else {
                        console.log("Successfully updated Trivia game stats of " + message.author.id + ".")
                      }
                  })
                  respond('Correct!', `<@${message.author.id}>, that was the correct answer!`, message.channel, '29BF00', `QID: ${item.qid}`)
                  message.delete()
                  return
                }
            })
            }else if(result.toLowerCase() == item.answer_case) {
              fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
                if(error) {
                  console.log("answer correct, capital letter. no leaderboard update.")
                  respond('Correct!', '<@' + message.author.id + '>, that was the correct answer! Next time, try using lowercase for the answer.\nIf you want to compete in the leaderboards, type `leaderboard init`.', message.channel, '29BF00', `QID: ${item.qid}`)
                  message.delete()
                  return
                } else {
                console.log('answer correct, capital letter')
                jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
                jsonfile.triviawins = Number(jsonfile.triviawins)+1;
                data = JSON.stringify(jsonfile)
                fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
                    if (err) throw err;
                    else {
                      console.log("Successfully updated Trivia game stats of " + message.author.id + ".")
                    }
                })
                respond('Correct!', `<@${message.author.id}>, that was the correct answer! Next time, try using lowercase for the answer.`, message.channel, '29BF00', `QID: ${item.qid}`)
                message.delete()
                return
                }
              })
            }else{
              fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
                if(error) {
                  console.log("answer wrong. no leaderboard update.")
                  respond('Wrong', '<@' + message.author.id + '>, that was the wrong answer.\nIf you want to compete in the leaderboards, type `leaderboard init`.', message.channel, 'BF0000', `QID: ${item.qid}`)
                  message.delete()
                  return
                } else {
                console.log('answer wrong')
                jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
                jsonfile.trivialosses = Number(jsonfile.trivialosses)+1;
                data = JSON.stringify(jsonfile)
                fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
                    if (err) throw err;
                    else {
                      console.log("Successfully updated Trivia game stats of " + message.author.id + ".")
                    }
                })
                respond('Wrong!', `<@${message.author.id}>, that was the wrong answer.`, message.channel, 'BF0000', `QID: ${item.qid}`)
                message.delete()
                return
              }
            })
            }
          }else{
            respond('Invalid Answer!', `<@${message.author.id}>, you didn't provide an answer.`, message.channel, 'ffff00')
          }
        }

        awaitMessageResponse('', 'What is your answer?', '', message.channel, '', responseReceived, message.author) 
  }
}