console.log('Loading. Please wait a moment.')
fs = require('fs');

returnFunction = function(returned, file){
	if(returned == 'progress'){
		console.log(`"${file}" was found. Check passed.`)
	}
	if(returned == true){
		bot = require('./modules/bot.js')
		bot.execute()
	}
}
const fileManager = require('./modules/fileManager.js')
fileManager.verifyFiles(returnFunction)