describe('Carbon Footprint Calculator', () => {

  beforeEach(() => {
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/');   
    cy.get('[id=ppl-in-household-input]').type('2');
    cy.get('[id=zip-code-input]').type('85001');
    cy.get('[id=get-started]').click();
  });

  describe('when started the carbon calculator', () => {
    it('redirect to calculator input infos Household Carbon Footprint Calculator page', () => {
      cy.get('.eps-header-info > h2').should('have.text', 'Household Carbon Footprint Calculator');
    });
  });

  describe('when some fields are filled in Home Energy and try generate report', () => {
    it('returns a report values greater than zero for Home Energy', () => {
      cy.get('[id=primaryHeatingSource]', { timeout: 10000 }).should('be.visible');
      cy.get('[id=primaryHeatingSource]').select('Electricity');
      cy.get('[id=electricityTextInput]').type('30');
      cy.get('[id=energyAC]').type('2');
      cy.get('[id=lightsToReplace]').type('20');
      cy.get('[id=coldWaterSelect]').select('Will Do');
      cy.get('[id=to-transportation]').click();
      cy.get('[id=to-waste]').click();
      cy.get('[id=to-report]').click();
      cy.get('[id=homeEnergyProgressBar]',).should('have.value', 26.666666666666668);
      cy.get('[id=transportationProgressBar]',).should('have.value', 0);
      cy.get('[id=wasteProgressBar]',).should('have.value', 0);
    });
  });

  describe('when all fields are not filled and try generate report', () => {
    it.only('returns a report values equal zero for all categories', () => {
      cy.get('[id=primaryHeatingSource]', { timeout: 10000 }).should('be.visible');
      cy.get('[id=to-transportation]').click();
      cy.get('[id=to-waste]').click();
      cy.get('[id=to-report]').click();
      cy.get('[id=homeEnergyProgressBar]',).should('have.value', 0);
      cy.get('[id=transportationProgressBar]',).should('have.value', 0);
      cy.get('[id=wasteProgressBar]',).should('have.value', 0);
    });
  });

});