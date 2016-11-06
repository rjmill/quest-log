var test = require('tape');

var quest = require('../src/quest/quest.js')();
var questList = require('../src/quest/questList.js');
var counterId = require('../src/quest/counterId.js');


var testDescription = "describing quest";
var testQuest;
var expectedId = 1;

var testDescription1 = "describing quest1";
var testQuest1;
var expectedId1 = 2;

var testDescription2 = "describing quest2";
var testQuest2;
var expectedId2 = 3;

var changedDescription = "newly changed description";
var questWithNoArgs;

var testQuestList;
var expectedTestQuestList;
var expectedTestQuestIdList;

var expectedDefaultStatus = "in progress";
var completedStatus = "completed";
var invalidStatus = "asdfasfdasfd";


var setup = function() {
  testQuest = quest(testDescription);
  testQuest1 = quest(testDescription1);
  testQuest2 = quest(testDescription2);
  questWithNoArgs = quest();


  expectedTestQuestList = [testQuest, testQuest1, testQuest2];
  expectedTestQuestIdList = [expectedId, expectedId1, expectedId2];
  testQuestList = questList();
  testQuestList
    .addQuest(testQuest)
    .addQuest(testQuest1)
    .addQuest(testQuest2);
}

var teardown = function() {
  testQuest = undefined;
  testQuest1 = undefined;
  testQuest2 = undefined;
  testQuestList = undefined;

  counterId.resetIds();
}

test('create a new quest', function(t) {
  setup();

  t.equal(testQuest.getDescription(), testDescription, "description is set correctly");
  t.equal(testQuest.getId(), expectedId, "id is correct");
  t.equal(testQuest.getStatus(), expectedDefaultStatus, "status is correct")

  teardown();
  t.end();
});

test('create three new quests', function(t) {
  setup();

  t.equal(testQuest.getDescription(), testDescription, "description is set correctly");
  t.equal(testQuest.getId(), expectedId, "id is correct");
  t.equal(testQuest.getStatus(), expectedDefaultStatus, "status is correct");

  t.equal(testQuest1.getDescription(), testDescription1, "description 1 is set correctly");
  t.equal(testQuest1.getId(), expectedId1, "id 1 is correct");
  t.equal(testQuest1.getStatus(), expectedDefaultStatus, "status 1 is correct");

  t.equal(testQuest2.getDescription(), testDescription2, "description 2 is set correctly");
  t.equal(testQuest2.getId(), expectedId2, "id 2 is correct");
  t.equal(testQuest2.getStatus(), expectedDefaultStatus, "status 2 is correct");

  teardown();
  t.end();
});

test('change quest info', function(t) {
  setup();

  testQuest.setDescription(changedDescription);
  t.equal(testQuest.getDescription(), changedDescription, "description is changed correctly");

  questWithNoArgs.setDescription(changedDescription);
  t.equal(questWithNoArgs.getDescription(), changedDescription, "description is changed correctly after no args");
  teardown();
  t.end();
});

test('add subquest to subquestList', function(t) {
  setup();

  testQuest.addQuest(testQuest1);
  t.equal(testQuest.getQuests().length, 1, "length is right after one addition")
  testQuest.addQuest(testQuest2);
  t.equal(testQuest.getQuests().length, 2, "length is right after two additions")

  t.equal(testQuest.getQuests()[0].getDescription(), testDescription1, "description of first subquest is correct");
  t.equal(testQuest.getQuests()[1].getDescription(), testDescription2, "description of second subquest is correct");

  teardown();
  t.end();
});

test('changing questStatus', function(t) {
  setup();

  t.equal(testQuest.getStatus(), expectedDefaultStatus, "default status is correct");

  testQuest.setStatus(completedStatus);
  t.equal(testQuest.getStatus(), completedStatus, "correctly changed to valid status");

  try {
    testQuest.setStatus(invalidStatus);
    t.fail("setting invalid status should throw error");
  } catch(e) {
    t.pass("setting invalid status threw an error");
  }

  teardown();
  t.end();
});

test('questList', function(t) {
  setup();

  t.deepEqual(testQuestList.getQuests(), expectedTestQuestList, "quest list contents are correct");
  t.deepEqual(testQuestList.getQuestIds(), expectedTestQuestIdList, "getQuestIds works");

  t.equal(testQuestList.findById(expectedId), testQuest, "finding by id works 0");
  t.equal(testQuestList.findById(expectedId1), testQuest1, "finding by id works 1");
  t.equal(testQuestList.findById(expectedId2), testQuest2, "finding by id works 2");

  // TODO: what should happen when findById doesn't find anything

  teardown();
  t.end();
})
