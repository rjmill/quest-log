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
  };
};

module.exports = questList;
