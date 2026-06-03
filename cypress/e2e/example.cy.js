describe('Platform selection', () => {
  it('shows Eventyay.com, Wikimedia, and Testing with Eventyay.com selected', () => {
    cy.visit('/')

    cy.get('select#select').should('have.value', 'Eventyay.com')
    cy.get('select#select option').then((options) => {
      expect([...options].map((option) => option.value)).to.deep.equal([
        'Eventyay.com',
        'Wikimedia',
        'Testing'
      ])
    })
    cy.contains('Open-Event').should('not.exist')
  })
})
