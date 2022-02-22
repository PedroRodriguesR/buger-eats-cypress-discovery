// Describe -> descreve uma Suite de testes 
describe('home page', () => {
    //it -> Descreve um Caso de teste
    it('app deve estar online', () => {
        /*cy -> cy é a variavel usada no cypress para poder acessar a API do cypress e poder usar os 
        recursos do framework*/

        //cy.viewport() -> serve para mudar a resolução(tamanho) da janela que o cypress irá abrir
        cy.viewport(1440, 900)

        //cy.visit() -> visita uma página
        cy.visit('https://buger-eats.vercel.app')

        //Verificar se achou o titulo da tela - O should é um assert
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')

    })

})