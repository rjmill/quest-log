// TODO: since you're using require, you can make this easier to read
var questStatus = (function() {
  var POSSIBLE_STATUSES = [
    "in progress",
    "completed",
  ];
  var DEFAULT_STATUS = "in progress";

  var isValidStatus = function(status) {
    return POSSIBLE_STATUSES.indexOf(status) !== -1;
  };

  function questStatus() {
    var status = DEFAULT_STATUS;
    return {
      getStatus: function() {
        return status;
      },
      setStatus: function(newStatus) {
        if (!isValidStatus(newStatus)) {
          throw new Error("invalid status");
        }
        status = newStatus;
        return this;
      },
    };
  }
  return questStatus;
})();

module.exports = questStatus;
