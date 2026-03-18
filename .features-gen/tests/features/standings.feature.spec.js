// Generated from: tests/features/standings.feature
import { test } from "playwright-bdd";

test.describe('View NHL standings', () => {

  test('Page load shows standings table with team names', async ({ Given, Then, And, page }) => { 
    await Given('I open the standings page', null, { page }); 
    await Then('I see a standings table', null, { page }); 
    await And('the table contains at least one team name', null, { page }); 
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
]; // bdd-data-end