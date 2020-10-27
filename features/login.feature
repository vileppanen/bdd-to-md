Feature: Login

    Login view enables registered users to login to system.
    If unauthorized user tries to login, guiding error messages are displayed accordingly.

    Scenario: Logging in with valid user name and password
        Given That valid user inputs name and correct password, longer than 8 characters
        When User clicks the login button
        Then The user is redirected to invoice list view

    Scenario: Logging in with invalid user name
        Given That invalid user name is input to the user name field
        When User clicks the login button
        Then An error message is shown indicating the login failed

    Scenario: Logging in with invalid password
        Given That invalid password is input to the password field
        When User clicks the login button
        Then An error message is shown indicating the login failed

