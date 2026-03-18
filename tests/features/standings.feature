Feature: View NHL standings

  Scenario: Page load shows standings table with team names
    Given I open the standings page
    Then I see a standings table
    And the table contains at least one team name

  Scenario: Standings table shows stats for each team
    Given I open the standings page
    Then the first row shows the team's games played, wins, losses, OT losses, and points

  Scenario: Page has a custom points form
    Given I open the standings page
    Then I see a form with inputs for Reg Win, OT Win, SO Win, OT Loss, SO Loss, and Reg Loss
    And the form has a Calculate button

  Scenario: Standings table has column headers
    Given I open the standings page
    Then the table has column headers: Team, GP, W, L, OTL, PTS

  Scenario: Custom points recalculates standings
    Given I open the standings page
    When I enter 3 for "Reg Win", 2 for "OT Win", 1 for "SO Win", 1 for "OT Loss", 0 for "SO Loss", 0 for "Reg Loss"
    And I click Calculate
    Then the first team's points show 128

  Scenario: Standings re-rank by custom points after Calculate
    Given I open the standings page
    When I enter 2 for "Reg Win", 3 for "OT Win", 3 for "SO Win", 1 for "OT Loss", 1 for "SO Loss", 0 for "Reg Loss"
    And I click Calculate
    Then the first team in the standings is "Dallas Stars"
