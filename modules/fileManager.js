const fs = require('fs')
module.exports = {
    description:"Executed when files need to be managed.",
    createRequired(returnFunction){
        fs.mkdir('./modules/resources', (err) => {
            if(err)returnFunction('error', err)
        })
    },
    resetFiles(returnFunction){},
    verifyFiles(returnFunction){
        currentCount = 0
        requiredFiles = ['./modules/bot.js','./resources/config.json','./resources/featuresConfig.json', './commands', './node_modules', './modules', './resources']
        requiredFiles.forEach(element => {
            fs.exists(element, (result) => {
                if(result == false){
                    console.log(`"${element}" doesn't exist!`)
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