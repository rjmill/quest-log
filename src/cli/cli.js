var vorpal = require('vorpal')();
var quest = require('../quest/quest.js');

// TODO: keep global state elsewhere
var globalQuestList = require('../quest/questList.js')();

vorpal.mode('new', 'new quest')
  .alias('n')
  .delimiter('newQuest:')
  .init(function(args, callback) {
    this.log('You can now start entering new quests.\nType "exit" to leave this mode.');
    callback();
  })
  .action(function(command, callback) {
    globalQuestList.addQuest(quest(command));
    this.log('quest added');
    callback();
  })

vorpal.command('show', 'show global quests')
  .alias('s')
  .action(function(args, callback) {
    var self = this;
    globalQuestList
      .getQuestList()
      .forEach(function(qst) {
        self.log(qst.getDescription());
      });
    callback();
  })

// TODO: look into getting a cooler delimiter
vorpal
  .delimiter('qlog$')
  .show();
