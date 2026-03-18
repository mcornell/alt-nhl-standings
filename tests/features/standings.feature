Feature: View NHL standings

  Scenario: Page load shows standings table with team names
    Given I open the standings page
    Then I see a standings table
    And the table contains at least one team name
