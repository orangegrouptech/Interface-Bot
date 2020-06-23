module.exports = {
  name: 'json',
	execute(message, args, client) {
    const userInteraction = require('../modules/userInteractionModule.js')
    userInteraction.testJsonSettings({haxIsCool:true, yeet:true, shrekIsGod:false, shrekIsTryingToGetMeForSayingThatHeIsNotGod:true})
  }
}