
describe('Carbon Footprint Calculator Home Page', () => {

  beforeEach(() => {
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/');   
  });

  describe('Validate required fields', () => {
   
   describe('when number of people in household and ZIP code are empty', () => {
      it('returns error message for each required field', () => {
        cy.get('[id=get-started]').click();
        cy.get('[id=invalidNum]').should('have.text', 'Please enter a valid number of people.');
        cy.get('[id=invalidZipNum]').should('have.text', 'Please enter a valid five-digit ZIP Code.');
      });
    });

    describe('when number of people in household is empty', () => {
      it('returns error message for required field', () => {
        cy.get('[id=zip-code-input]').type('85001');
        cy.get('[id=get-started]').click();
        cy.get('[id=invalidNum]').should('have.text', 'Please enter a valid number of people.');
      });
    });

    describe('when ZIP code is empty', () => {
      it('returns error message for required field', () => {
        cy.get('[id=ppl-in-household-input]').type('2');
        cy.get('[id=get-started]').click();
        cy.get('[id=invalidZipNum]').should('have.text', 'Please enter a valid five-digit ZIP Code.');
      });
    });

    describe('when number of people in household is invalid', () => {
      it('returns error message for invalid data', () => {
        cy.get('[id=ppl-in-household-input]').type('-1');
        cy.get('[id=zip-code-input]').type('85001');
        cy.get('[id=get-started]').click();
        cy.get('[id=invalidNum]').should('have.text', 'Please enter a valid number of people.');
      });
    });

    describe('when ZIP code is invalid', () => {
      it('returns error message for invalid data', () => {
        cy.get('[id=ppl-in-household-input]').type('2');
        cy.get('[id=zip-code-input]').type('4132');
        cy.get('[id=get-started]').click();
        cy.get('[id=invalidZipNum]').should('have.text', 'Please enter a valid five-digit ZIP Code.');
      });
    });

    describe('when ZIP code data not existing', () => {
      it('returns error message for data not found', () => {
        cy.get('[id=ppl-in-household-input]').type('2');
        cy.get('[id=zip-code-input]').type('00000');
        cy.get('[id=get-started]').click();
        cy.get('[id=invalidZip]').should('have.text', 'We could not find your ZIP code in our database. Please try again, or you may continue using the calculator with a default value. Using the default will give you average estimates.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t  I will use the default ZIP code.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t');
      });
    });

  });

}); 