Feature: View NHL standings

  Scenario: Page load shows standings table with team names
    Given I open the standings page
    Then I see a standings table
    And the table contains at least one team name

  Scenario: Standings table shows stats for each team
    Given I open the standings page
    Then the first row shows the team's games played, wins, losses, OT losses, and points
