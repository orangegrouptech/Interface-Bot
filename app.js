console.log('Loading. Please wait a moment.')
fs = require('fs');

returnFunction = function(returned, file){
	if(returned == 'progress'){
		console.log(`Passed: "${file}" was found.`)
	}
	if(returned == true){
		console.log(`All files were successfully found.`)
		bot = require('./modules/bot.js')
		bot.execute()
	}
}
const fileManager = require('./modules/fileManager.js')
fileManager.verifyFiles(returnFunction)