// TODO: do some kind of dependency injection for the id factory
var counterId = require('./counterId.js');

var questDescription = function(description) {
  return {
    getDescription: function() {
      return description;
    },
    setDescription: function(newDescription) {
      description = newDescription;
      return this;
    },
  };
};

// TODO: get a better idea of what you want this to do
var questState = (function() {
  var POSSIBLE_STATES = [
    "new",
    "in progress",
    "completed",
  ];
  var DEFAULT_STATE = "new";

  function questState() {
    var state = DEFAULT_STATE;
    return {
      getState: function() {
        return state;
      },
    };
  }

  return questState;
})();

// TODO: select specific quest
var questList = function() {
  var questList = [];
  return {
    addQuest: function(quest) {
      questList.push(quest);
      return this;
    },
    getQuestList: function() {
      return questList;
    },
  }
}

// TODO: add questState
var quest = function(description) {
  var description = questDescription(description);
  var subquestList = questList();
  return Object.assign({
                         id: counterId.getNewId(),
                       },
                       description,
                       { // TODO: consider assinging to a variable for readability?
                         addSubquest: subquestList.addQuest,
                         getSubquestList: subquestList.getQuestList
                       });
};

module.exports = quest;
