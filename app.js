console.log('Loading. Please wait a moment.')
const fs = require('fs');
if(!fs.existsSync('./modules') || !fs.existsSync('./resources')){
	return console.log('MISSING REQUIRED FILES!')
}
const featuresConfig = require('./resources/featuresConfig.json');
const bot = require('./modules/bot');
if(featuresConfig.bootFileCheck == true){
returnFunction = function(returned, file){
	if(returned == 'progress'){
		console.log(`Passed: "${file}" was found.`)
	}
	if(returned == true){
		console.log(`All files were successfully found.`)
		const bot = require('./modules/bot.js')
		bot.execute()
	}
}
const fileManager = require('./modules/fileManager.js')
fileManager.verifyFiles(returnFunction)
}else if(featuresConfig.bootFileCheck == false){
	console.log('Automatic file check skipped.')
	const bot = require('./modules/bot.js')
	bot.execute()
}else{
	console.log(`Error: Missing entry in featuresConfig.json. (bootFileCheck)`)
}