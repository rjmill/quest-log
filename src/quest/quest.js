var questList = require('./questList.js');
var questStatus = require('./questStatus.js')
var idFactory = require('./counterId.js');


var questId = function(optionalId) {
  var id = optionalId || idFactory.createNewId();
  return {
    getId: function() { return id; },
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

// TODO: move this to its own file
// FIXME: better name
var asJSONable = (function() {
  var toJSON = function toJSON() {
    var obj = Object.create(null);
    obj.id = this.getId();
    obj.description = this.getDescription();
    obj.questList = this.getQuestIds();
    return JSON.stringify(obj, null, '\t');
  };

  return {
    toJSON: toJSON,
  };
})();

var quest = function(mixin) {
  function quest(description, optionalId) {
    return Object.assign({},
                        questDescription(description),
                        questStatus(),
                        questList(),
                        questId(),
                        asJSONable,
                        mixin);
  };

  return quest;
};


module.exports = quest;
