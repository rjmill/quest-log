/**
 * Mixin containing CLI-specific features/helper functions.
 */


var STATUS_STRINGS = {
  "in progress": "[ ]",
  "completed": "[x]",
};

var statusToString = function(qst) {
  return STATUS_STRINGS[qst.getStatus()];
};

var display = function() {
  return statusToString(this) + " " + this.getId() + " " + this.getDescription();
};

module.exports = {
  display: display,
};
