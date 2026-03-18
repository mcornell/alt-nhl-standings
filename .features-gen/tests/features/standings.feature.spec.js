// Generated from: tests/features/standings.feature
import { test } from "playwright-bdd";

test.describe('View NHL standings', () => {

  test('Page load shows standings table with team names', async ({ Given, Then, And, page }) => { 
    await Given('I open the standings page', null, { page }); 
    await Then('I see a standings table', null, { page }); 
    await And('the table contains at least one team name', null, { page }); 
  });

  test('Standings table shows stats for each team', async ({ Given, Then, page }) => { 
    await Given('I open the standings page', null, { page }); 
    await Then('the first row shows the team\'s games played, wins, losses, OT losses, and points', null, { page }); 
  });

  test('Page has a custom points form', async ({ Given, Then, And, page }) => { 
    await Given('I open the standings page', null, { page }); 
    await Then('I see a form with inputs for Reg Win, OT Win, SO Win, OT Loss, SO Loss, and Reg Loss', null, { page }); 
    await And('the form has a Calculate button', null, { page }); 
  });

  test('Standings table has column headers', async ({ Given, Then, page }) => { 
    await Given('I open the standings page', null, { page }); 
    await Then('the table has column headers: Team, GP, W, L, OTL, PTS', null, { page }); 
  });

  test('Custom points recalculates standings', async ({ Given, When, Then, And, page }) => { 
    await Given('I open the standings page', null, { page }); 
    await When('I enter 3 for "Reg Win", 2 for "OT Win", 1 for "SO Win", 1 for "OT Loss", 0 for "SO Loss", 0 for "Reg Loss"', null, { page }); 
    await And('I click Calculate', null, { page }); 
    await Then('the first team\'s points show 128', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/standings.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the standings page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then I see a standings table","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"And the table contains at least one team name","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given I open the standings page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the first row shows the team's games played, wins, losses, OT losses, and points","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":18,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I open the standings page","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I see a form with inputs for Reg Win, OT Win, SO Win, OT Loss, SO Loss, and Reg Loss","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And the form has a Calculate button","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":24,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given I open the standings page","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the table has column headers: Team, GP, W, L, OTL, PTS","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":21,"tags":[],"steps":[{"pwStepLine":29,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given I open the standings page","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I enter 3 for \"Reg Win\", 2 for \"OT Win\", 1 for \"SO Win\", 1 for \"OT Loss\", 0 for \"SO Loss\", 0 for \"Reg Loss\"","stepMatchArguments":[{"group":{"start":8,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":14,"value":"\"Reg Win\"","children":[{"start":15,"value":"Reg Win","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"2","children":[]},"parameterTypeName":"int"},{"group":{"start":31,"value":"\"OT Win\"","children":[{"start":32,"value":"OT Win","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":47,"value":"\"SO Win\"","children":[{"start":48,"value":"SO Win","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":57,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":63,"value":"\"OT Loss\"","children":[{"start":64,"value":"OT Loss","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":74,"value":"0","children":[]},"parameterTypeName":"int"},{"group":{"start":80,"value":"\"SO Loss\"","children":[{"start":81,"value":"SO Loss","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":91,"value":"0","children":[]},"parameterTypeName":"int"},{"group":{"start":97,"value":"\"Reg Loss\"","children":[{"start":98,"value":"Reg Loss","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And I click Calculate","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the first team's points show 128","stepMatchArguments":[{"group":{"start":29,"value":"128","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end