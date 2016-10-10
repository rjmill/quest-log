var questList = function() {
  var questList = [];
  return {
    addQuest: function(quest) {
      questList.push(quest);
      return this;
    },
    getQuestList: function() {
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
  };
};

module.exports = questList;
