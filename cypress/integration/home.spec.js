// Describe -> descreve uma Suite de testes 
describe('home page', () => {
    //it -> Descreve um Caso de teste
    it('app deve estar online', () => {
        /*cy -> cy é a variavel usada no cypress para poder acessar a API do cypress e poder usar os 
        recursos do framework*/

        //cy.visit() -> visita uma página
        cy.visit('/')

        //Verificar se achou o titulo da tela - O should é um assert
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')

    })

})