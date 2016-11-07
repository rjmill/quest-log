var vorpal = require('vorpal')();

var LocalStorage = require('node-localstorage').LocalStorage;
var path = require('path');
var os = require('os');
// TODO: use this in a "testmode" startup argument
var temp = path.normalize(path.join(os.tmpdir(), '/.quest_log'));
var home = path.normalize(path.join(os.homedir(), '/.quest_log'));
var DEFAULT_STORAGE_PATH = home;
// TODO: figure out how you're going to handle global state
var globalQuestList = require('../quest/questList.js')();


// TODO: unit tests for this
// TODO: put this into another file
/**
 * Mixin containing CLI-specific features/helper functions.
 */
var cliQuestMixin = (function() {
  var STATUS_STRINGS = {
    "in progress": "[ ]",
    "completed": "[x]",
  };

  // FIXME: RENAME THIS
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

// HACK: I want the requires to be at the top of the program
var quest = require('../quest/quest.js')(cliQuestMixin);

// TODO: Might want to abstract away the localStorage init logic
//       Maybe put it into cliQuestMixin or something similar?
var localStorage = new LocalStorage(path.join(DEFAULT_STORAGE_PATH));

/**
 * TODO:
 *  - write tests for all of this
 *  - warning on exit: "Would you like to save?"
 *  - move cliQuestMixin into its own file
 *  - for testing, extract the mode definitions into variables
 *    - or find/make a vorpal command to get all the commands
 */

/**
 * new
 *
 * Mode for creating new quests
 *
 * TODO:
 *  - creating new subquests of a newly created quest
 */
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

/**
 * show
 *
 * Shows all quests
 *
 * TODO:
 *  - indicate nesting structure
 *    - how?
 *  - decide on defaults
 *    - show ALL quests?
 *    - show CURRENT quests?
 *    - show TOPLEVEL quests?
 *  - args
 *    - all
 *    - incomplete
 *    - active
 *    - finished
 *    - regex to search for?
 */
var showCommand = vorpal.command('show', 'show global quests')
  .alias('sh')
  .alias('ls')
  .action(function(args, callback) {
    globalQuestList
      .getQuests()
      .forEach(function(qst) {
        this.log(qst.display());
      }.bind(this));
    callback();
  });

/**
 * select
 *
 * TODO:
 *  - edit
 *  - add subquest
 *  - change quest status
 */
var selectMode = vorpal.mode('select <id>', 'select quest by id')
  .alias('sel')
  .init(function(args, callback) {
    // TODO: put this into some sort of mode state
    var qst = globalQuestList.findById(args.id);
    this.log(qst.display());
    callback();
  })
  .action(function(command, callback) {
    command = command.trim();
    callback();
  })

/**
 * save
 *
 * TODO:
 *  - saving subquests
 */
var saveCommand = vorpal.command('save', 'Save current state')
  .alias('s')
  .action(function(args, callback) {
    var key = null;
    globalQuestList.getQuests().forEach(function(qst) {
      this.log("DEBUG: saving \n" + qst.toJSON());
      // FIXME: this can throw an error
      key = '_id' + qst.getId();
      this.log('DEBUG: key = ' + key);
      localStorage.setItem(key, qst.toJSON());
    }.bind(this));
    this.log('DEBUG: localStorageToObject: \n' + JSON.stringify(localStorageToObject(), null, "\t"));
    this.log('DEBUG: localStorage.length = ' + localStorage.length);
    callback();
  })

/**
 * restore
 *
 * TODO:
 *  - restoring subquests
 *  - what to do when there are unstored quests in memory?
 */
var restoreCommand = vorpal.command('restore', 'Restore saved data')
  .alias('r')
  .action(function(args, callback) {
    var current;
    var newQuest;
    var key;
    this.log('localStorage.length = ' + localStorage.length);
    for (var i = 0; i < localStorage.length; i++) {
      this.log('current iteration: ' + i);
      key = localStorage.key(i);
      this.log(key);
      currentQuest = localStorage.getItem(key);
      // TODO: extract out to a function or mixin
      this.log("adding quest: \n" + currentQuest);
      currentQuest = JSON.parse(currentQuest);
      newQuest = quest(currentQuest.description, currentQuest.id);
      globalQuestList.addQuest(newQuest);
    }
    callback();
  })

/**
 * clear
 *
 * TODO:
 *  - big fat warning label
 *  - needs to clear quests in memory too
 */
var clearCommand = vorpal.command('clear', 'clear data')
  .action(function(args, callback) {
    localStorage.clear();
    callback();
  })

function localStorageToObject() {
  var obj = {};
  var key = null;
  var value = null;
  for (var i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    try {
      value = JSON.parse(localStorage.getItem(key));
    } catch(e) {
      value = localStorage.getItem(key);
    }
    obj[key] = value;
  }
  return obj;
}

// TODO: maybe a shorter delimiter since we might start nesting like crazy?
vorpal
  .delimiter('quests$')
  .show();
