module.exports = {
  description: `You may ask me a question`,
  process: function(bot, msg, args) {
    let magicAxeBallAnswers = require('../responses').magicAxeBallAnswers;
    let i = require('../utility').randomNumber(magicAxeBallAnswers.length);

    if (msg.content.split(' ').length > 1) {
      msg.channel.sendMessage(magicAxeBallAnswers[i]);
    }
    else {
      msg.reply(`You did not ask a question.`);
    }
  }
};