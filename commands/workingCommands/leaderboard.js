module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'gamelb', 'rank', 'gamerank'],
    description: 'Feeling competitive? Check who\'s on top with this command!',
    usage: '',
    cooldown: 0,
    hidden: true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      const arg = msg.content.slice('').trim().split(/ +/g); 
      try {
         if(arg[1] === 'init'){
            fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', err => {
                if(err) {
                    fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', JSON.stringify({
                        "triviawins" : 0, 
                        "trivialosses" : 0,
                        "cryptwins" : 0, 
                        "cryptlosses" : 0,
                        "rdgwins" : 0,
                        "rdgties" : 0,
                        "rdglosses" : 0,
                        "slotswins" : 0, 
                        "slotslosses" : 0,
                        "slotsminorwins" : 0,
                        "roulettewins" : 0, 
                        "roulettelosses" : 0,
                        "rouletteminorwins" : 0
                    }), (err) => {if(err)console.log(err)});
                    console.log(message.author.tag + " is ready to compete.");
                    reply('🎮 Game Leaderboard', 'Your Leaderboard data has been initialized.\nGo compete with other members in the server!' ,'', message.channel);
                    return;
                }else {
                    console.log(message.author.tag + " is already competing!");
                    reply('🎮 Game Leaderboard', 'You already have Leaderboard data!','' , message.channel)
                    return
                }
            })
          }
          if(arg[1] === 'wipe'){
            console.log("If you see this message and nothing is under it, check code!")
            fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', err => {
                console.log(err)
                if(!err) {
                    fs.unlinkSync('./leaderboards/' + message.author.id + '_gamestats.json', err)
                    console.log(message.author.tag + " quit the leaderboards.")
                            reply('🎮 Game Leaderboard', 'Your Leaderboard stats have been successfully wiped.', '', message.channel);
                            return
                } else {
                    reply('🎮 Game Leaderboard', 'Your Leaderboard stats do not exist.\nType `leaderboard init` to start competing with other members in the server!', '', message.channel);
                    return
                }
             })
          } else if(arg[1] === 'info'){
            reply('🎮 About Game Leaderboard', 'Version: 1.1.12 build 031\nAuthors: Thomas Stefanos & Daniel' , '', message.channel)
            return
          } else if(!arg[1]){
            if(!fs.existsSync('./leaderboards')){
              fs.mkdirSync('./leaderboards')
            }
        fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
            if (!error) {
            const stats = require('../leaderboards/' + message.author.id + '_gamestats.json')
            var tWins = stats["triviawins"]
            var tLosses = stats["trivialosses"]
            var tAllGames = tWins+tLosses
            var cWins = stats["cryptwins"]
            var cLosses = stats["cryptlosses"]
            var cAllGames = cWins+cLosses
            var rWins = stats["rdgwins"]
            var rTies = stats["rdgties"]
            var rLosses = stats["rdglosses"]
            var rAllGames = rWins+rLosses+rTies
            var sWins = stats["slotswins"]
            var sLosses = stats["slotslosses"]
            var smWins = stats["slotsminorwins"]
            var sAllGames = sWins+sLosses+smWins
            var roWins = stats["roulettewins"]
            var roLosses = stats["roulettelosses"]
            var romWins = stats["rouletteminorwins"]
            var roAllGames = roWins+roLosses+romWins
            console.log("Successfully loaded leaderboard stats of " + message.author.tag + ".")
              reply('🎮 Game Leaderboard', message.author.tag + ', here are your Leaderboard stats:\n__**-=Trivia=-**__\nCorrect answers: ' + tWins + "\nWrong answers: " + tLosses + "\nTotal number of Trivia games played: " + tAllGames + '\n__**-=Cryptogram=-**__\nSuccessful digital heists: ' + cWins + "\nInfected computers: " + cLosses + "\nTotal number of computers accessed: " + cAllGames + '\n__**-=Roll Dice Game=-**__\nHigh rolls: ' + rWins + "\nLosing rolls: " + rLosses + "\nSame rolls: " + rTies + "\nTotal number of dice games played: " + rAllGames + '\n__**-=Slots=-**__\nJackpots hit: ' + sWins + "\nMinor prize rolls hit: " + smWins + "\nLosing rolls: " + sLosses + "\nTotal number of slot attempts: " + sAllGames + '\n__**-=Roulette=-**__\nWinning rolls: ' + roWins + "\nMinor winning rolls: " + romWins + "\nLosing rolls: " + roLosses + "\nTotal number of Roulette rolls: " + roAllGames, '', message.channel)
              return
            } else if(error) {
              reply('🎮 Game Leaderboard', 'Your Leaderboard stats do not exist.\nType `leaderboard init` to start competing with other members in the server!', '', message.channel);
              return;
            }
          });
        }
    }catch(error) {
      reply('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, '', message.channel)
      error(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }
