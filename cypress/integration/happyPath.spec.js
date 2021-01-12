/* eslint-disable no-undef */
context('Happy Path', () => {
  beforeEach(() => {
    // cy.exec('cd ../ && npm run reset && npm restart');
    cy.visit('localhost:3000');
  });
  it('Successfully signs up, creates a game, ends a game, display results, logs out and logs back in', () => {
    // Sign up
    const name = 'Small Brain';
    const email = 'smallbrain@mail.com';
    const password = 'password';
    cy.get('a[href="/signup"]').click();
    cy.get('input[name=name]')
      .focus()
      .type(name);
    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('input[name=repeatPassword]')
      .focus()
      .type(password);
    cy.get('button[type=submit]').click();

    // Create Game
    cy.get('button[id="createGameButton"]').click();
    const title = 'Test Game';
    cy.get('input[name=title]')
      .focus()
      .type(title);
    cy.get('button[type=submit]').click();

    // Create Question
    cy.get('button[aria-label="edit-game-button"]').click();
    cy.get('button[aria-label="add-game"]').click();
    const question = 'Question 1';
    cy.get('textarea[name=question]')
      .focus()
      .type(question);
    cy.get('select[id="questionNum"]').select('2');
    const choice1 = '1';
    const choice2 = '2';
    cy.get('input[name="choices.0.choice"]')
      .focus()
      .type(choice1);
    cy.get('input[name="choices.1.choice"]')
      .focus()
      .type(choice2);
    cy.get('button[type=submit]').click();

    // Start Game, advance game until Result Page loads
    cy.get('a[href="/dashboard"]').click();
    cy.get('button[aria-label=start-game]').click();
    cy.get('button[aria-label=advance-game]').click();
    cy.get('button[aria-label=advance-game]').click();

    // Logout
    cy.get('a[href="/"]').click();

    // Log in again
    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('button[type=submit]').click();
  });
});
