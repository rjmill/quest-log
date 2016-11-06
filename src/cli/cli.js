var vorpal = require('vorpal')();

var LocalStorage = require('node-localstorage').LocalStorage;
var path = require('path');
const os = require('os');
const temp = path.normalize(path.join(os.tmpdir(), '/.local_storage'));
const home = path.normalize(path.join(os.homedir(), '/.local_storage'));
const DEFAULT_STORAGE_PATH = home;

// TODO: unit tests for this
// TODO: put this into another file
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

var quest = require('../quest/quest.js')(cliQuestMixin);

// TODO: keep global state elsewhere
var globalQuestList = require('../quest/questList.js')();

vorpal.localStorage('quest-log');

var localStorage = new LocalStorage(DEFAULT_STORAGE_PATH + "quest-log");

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

var showCommand = vorpal.command('show', 'show global quests')
  .alias('sh')
  .action(function(args, callback) {
    globalQuestList
      .getQuests()
      .forEach(function(qst) {
        this.log(qst.display());
      }.bind(this));
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
  .action(function(command, callback) {
    command = command.trim();
    callback();
  });
  // TODO: edit
  // TODO: add subquest
  // TODO: change status

// TODO: teach this to handle subquests
var saveCommand = vorpal.command('save', 'Save current state')
  .alias('s')
  .action(function(args, callback) {
    var key = null;
    globalQuestList.getQuests().forEach(function(qst) {
      this.log("saving: \n" + qst.toJSON());
      // FIXME: this can throw an error
      key = '_id' + qst.getId();
      this.log('key = ' + key);
      localStorage.setItem(key, qst.toJSON());
    }.bind(this));
    console.log('localStorageToObject: \n' + JSON.stringify(localStorageToObject(), null, "\t"));
    this.log('localStorage.length = ' + localStorage.length);
    callback();
  })

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
      // TODO: this doesn't handle subquests yet
      // TODO: extract out to a function or mixin
      this.log("adding quest: \n" + currentQuest);
      currentQuest = JSON.parse(currentQuest);
      newQuest = quest(currentQuest.description, currentQuest.id);
      globalQuestList.addQuest(newQuest);
    }
    callback();
  })

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

// TODO: this needs to be unit tested
// TODO: integrate with the quest object
// TODO: make this dependency injectable
function saveAllQuests(questList) {
  questList.getQuests().forEach(function(qst) {
    // TODO
  })
}

// TODO: IMPORTANT TO UNIT TEST
function questFromJson(qst) {
  // TODO
}

function saveQuest(qst) {
  // TODO
}

// TODO: look into getting a cooler delimiter
vorpal
  .delimiter('quests$')
  .show();
