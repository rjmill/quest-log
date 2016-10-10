var questList = require('./questList.js');
var questStatus = require('./questStatus.js')
var idFactory = require('./counterId.js');


var questId = function() {
  var id = idFactory.createNewId();
  return {
    getId: function() {
      return id;
    },
  };
};

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

var quest = function(mixin) {
  function quest(description) {
    return Object.assign({},
                        questDescription(description),
                        questStatus(),
                        questList(),
                        questId(),
                        mixin);
  };

  return quest;
};


module.exports = quest;
