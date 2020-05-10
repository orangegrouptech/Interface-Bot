module.exports = {
    name: 'neverhaveiever',
    aliases: ['nhie', 'neverever', 'never'],
    description: '**This is a game command.**\nHave you done this? Have you done that?\nNo drinking included.',
    usage: '',
    hidden:true,
    cooldown: 0,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      //Pick a question
      const never = require('./never.json');
      const item = never[Math.floor(Math.random() * never.length)];
      const filter = response => {
        console.log(response)
        return item.answer
      }
      console.log(item)
          respond('Never Have I Ever',"Never have I ever " + item.neverhaveiever + "\nNever ID: " + item.neverid + "\nIf you have done that, type .donethat (Never ID).\nIf you have not done that, type .neverdonethat (Never ID).", message.channel) 
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }