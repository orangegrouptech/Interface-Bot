const fs = require('fs')
module.exports = {
    description:"Executed when files need to be managed.",
    createRequired(returnFunction){
        fs.mkdir('./modules/resources', (err) => {
            if(err)returnFunction('error', err)
        })
    },
    resetFiles(returnFunction){},
    async verifyFiles(returnFunction){
        const commandList = []
        const commandFiles = fs.readdirSync('./commands')
        .filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            fs.readFile(file, (err, data) => {
                if(file.toString().includes("../config.json")){
                    var newFileContent = file.toString().replace(/..\/config.json/g, '../resources/config.json')
                    fs.writeFileSync(`./commands/${file}`, newFileContent)
                }
            })
            const command = require(`../commands/${file}`)
            const commandName = command.name.substr(0,1)
            if(commandName == commandName.toUpperCase() || commandList.includes(command.name)){
                console.log(`Failed: "${file}" command has an invalid command name!`)
                process.exit()
            }else{
                commandList.push(command.name)
                console.log(`Passed: "${file}" command has a valid command name.`)
            }
	    }
        currentCount = 0
        requiredFiles = ['./modules/bot.js','./resources/config.json','./resources/featuresConfig.json', './commands', './node_modules', './modules', './resources']
        requiredFiles.forEach(element => {
            fs.exists(element, (result) => {
                if(result == false){
                    console.log(`Failed: "${element}" doesn't exist!`)
                    process.exit()
                }
                currentCount = currentCount+1
                returnFunction('progress', element)
                if(currentCount == requiredFiles.length){
                    returnFunction(true)
                }
            })
        })
    },
    read(filePath, returnFunction){
        fs.readFile(filePath, (err, data) =>{
            if(err){
                returnFunction('error', err)
            }else{
                returnFunction(data)
            }
        })
    },
    write(filePath, data, returnFunction){
        fs.writeFile(filePath, data, (err) => {
            if(err){
                returnFunction('error', err)
            }else{
                returnFunction(true)
            }
        })
    }
}