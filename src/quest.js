// FIXME: better name
var questInfo = function(title, description) {
  return {
    getTitle: function() {
      return title;
    },
    setTitle: function(newTitle) {
      title = newTitle;
      return this;
    },
    getDescription: function() {
      return description;
    },
    setDescription: function(newDescription) {
      description = newDescription;
      return this;
    },
  }
};

// TODO: get a better idea of what you want this to do
var questState = (function() {
  var POSSIBLE_STATES = [
    "new",
    "in progress",
    "completed",
  ]

  var DEFAULT_STATE = "new";

  function questState() {
    var state = DEFAULT_STATE;

    return {
      getState: function() {
        return state;
      }
    }
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

// TODO: mark quest as completed
var quest = function(title, description) {
  var info = questInfo(title, description);
  var subquestList = questList();
  return Object.assign({}, info, 
                       { // TODO: consider assinging to a variable for readability?
                         addSubquest: subquestList.addQuest,
                         getSubquestList: subquestList.getQuestList
                       });
};

module.exports = quest;
