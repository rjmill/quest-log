// TODO: do some kind of dependency injection for the id factory?
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
  return Object.assign({},
                       questDescription(description),
                       questStatus(),
                       questList(),
                       {
                         id: counterId.getNewId(),
                       });
};

module.exports = quest;
