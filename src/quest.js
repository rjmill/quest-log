// TODO: do some kind of dependency injection for the id factory
var counterId = require('./counterId.js');
var questList = require('./questList.js');
var questStatus = require('./questStatus.js')

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

var quest = function(description) {
  // TODO: consider just cramming these bad boys into Object.assign?
  var description = questDescription(description);
  var status = questStatus();
  // FIXME: make this just questList
  var subquestList = questList();
  return Object.assign({}, description, status,
                       { // TODO: consider assinging to a variable for readability?
                         addSubquest: subquestList.addQuest,
                         getSubquestList: subquestList.getQuestList
                       },
                       { // TODO: concatenate these objects?
                         id: counterId.getNewId(),
                       });
};

module.exports = quest;
