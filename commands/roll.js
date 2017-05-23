module.exports = {
  description: `I can roll DnD style dice for you, if you choose, but know this - It is beneath my dignity and you will answer for lowering me thus.`,
  process: function(bot, msg, args) {
    let DiceRoll = require('roll');
    let defaultRoll = require('../config').rollDefault;
    let roll = new DiceRoll();
    let rollArgs = args.toLowerCase().split(' ');  // create an array of arguments
    let normalizedRoll = '';                      // create an empty string for adding normalized arguments
    let theseFucksAreTryingToCrashMe = false;    // initialize crashy variable

    rollArgs.forEach((arg) => {
      if (arg.length > 7) {   // if the user is sending a roll too big to process
        theseFucksAreTryingToCrashMe = true; // then they are trying to crash Axebot
        return;                              // stop processing arguments
      }
      normalizedRoll+=arg;  // if they aren't trying to crash Axebot, add argument to string
    });

    if (!theseFucksAreTryingToCrashMe) { // if the roll isn't too big
      if (!args) {                      // and if there aren't any arguments
        // roll the default set in config.js
        msg.reply(`You rolled ${roll.roll(defaultRoll).result} out of ${defaultRoll}`);
      }
      else if (!roll.validate(normalizedRoll)) {  // don't roll if aruments aren't valid
        // and then yell at them for their stupidity
        msg.reply(`**${args}** isn't something you can roll. Are you toying with me, or merely that stupid?`);
      }
      else {
        let finishedRoll = roll.roll(normalizedRoll);  // roll the non-crashy string
        let resultsArray = finishedRoll.rolled;  // get an array of the rolls involved
        if (finishedRoll.rolled.length < 500) {  // make sure the results aren't too long to print
          msg.reply(`You rolled ${finishedRoll.result} - *(${resultsArray})*`); // display roll and array
        } 
        else {
          // display roll without array if array is too big
          msg.reply(`You rolled ${finishedRoll.result} - *Though I can't show you that many at once.*`);
        }
      } 
    }
    else {
      // yell at them if they are trying to break you
      msg.reply(`*Are you trying to give me a stroke?* You know you can't.`);
    }
  }
};