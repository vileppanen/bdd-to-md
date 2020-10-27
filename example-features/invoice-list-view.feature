Feature: Invoice list view

    Invoice list view is presentation of all customer's invoices in one view.
    From invoice list view, customer may select a sepcific invoice for viewing.

    Background: Assuming following conditions apply
        Given User is logged in

    Scenario: User can view customer's invoices if the user has privileges
        Given Bob Sponge has privileges for a customer
        When Bob Sponge opens the invoice list view
        Then He sees the invoices of the customer

    Scenario: Admin user can view invoices of all customers
        Given Largo Notsogrande has admin privileges
        When Largo Notsogrande opens the invoice list view
        Then He sees all invoices
