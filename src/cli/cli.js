var vorpal = require('vorpal')();

// TODO: unit tests for this
// TODO: put this into another file
var cliQuestMixin = (function() {
  var STATUS_STRINGS = {
    "in progress": "[ ]",
    "completed": "[x]",
  };

  var statusToString = function(qst) {
    return STATUS_STRINGS[qst.getStatus()];
  };

  var display = function() {
    return statusToString(this) + " " + this.getId() + " " + this.getDescription();
  };

  return {
    display: display,
  };
})();

var quest = require('../quest/quest.js')(cliQuestMixin);

// TODO: keep global state elsewhere
var globalQuestList = require('../quest/questList.js')();

var newMode = vorpal.mode('new', 'new quest')
  .alias('n')
  .delimiter('new:')
  .init(function(args, callback) {
    this.log('You can now start entering new quests.\nType "exit" to leave this mode.');
    callback();
  })
  .action(function(command, callback) {
    var newQuest = quest(command);
    globalQuestList.addQuest(newQuest);
    this.log('quest added (id:' + newQuest.getId() + ')');
    callback();
  })

var showCmd = vorpal.command('show', 'show global quests')
  .alias('sh')
  .action(function(args, callback) {
    var self = this;
    globalQuestList
      .getQuestList()
      .forEach(function(qst) {
        self.log(qst.display());
      });
    callback();
  })

var findMode = vorpal.mode('select <id>', 'select quest by id')
  .alias('sel')
  .init(function(args, callback) {
    // TODO: put this into some sort of mode state
    var qst = globalQuestList.findById(args.id);
    this.log(qst.display());
    callback();
  })
  // TODO: edit
  // TODO: add subquest
  // TODO: change status

// TODO: look into getting a cooler delimiter
vorpal
  .delimiter('quests$')
  .show();
