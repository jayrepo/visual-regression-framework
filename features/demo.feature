Feature: Visual Regression Testing

  Scenario Outline: Visual Regression Testing of Google
    Given I go to "<url>"
    When I make some changes
    Then I take screenshot of the page as "<fileName>"

    Examples:
      | url                                                             | fileName |
      | https://getbootstrap.com                                        | Home     |
      | https://getbootstrap.com/docs/4.0/getting-started/introduction/ | Doc      |

