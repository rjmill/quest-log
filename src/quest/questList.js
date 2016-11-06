var questList = function() {
  var questList = [];
  var getQuestIds = function() {
    return questList.map(function(qst) {
      return qst.getId();
    })
  };
  // TODO: move these function declarations outside the return object
  return {
    addQuest: function(quest) {
      questList.push(quest);
      return this;
    },
    getQuests: function() {
      return questList.slice();
    },
    findById: function(id) {
      // FIXME: kind of hacky
      var ret = questList.filter(function(qst) {
        return qst.getId() === id;
      });
      // TODO: error handling
      return ret[0];
    },
    getQuestIds: getQuestIds,
  };
};

module.exports = questList;
