//Criada uma classe para usar o padrão de projeto - page object , onde tem uma classe que tem as funções de uma pagina
class SignupPage {

    //Criada uma função
    go() {
        /* Definir tamanho da janela e acessar o site, porém fazemos isso pelo arquivo cypress.json nas config do projeto
        cy.viewport(1440, 900)

           Podemos colocar essa URL base que está abaixo, nos arquivos de config tb pra nao ter que escrever no teste
        cy.visit('https://buger-eats.vercel.app') */
        cy.visit('/') //  URL já configurada no arquivo cypress.json

        //clicar no botão de cadastre-se
        cy.get('a[href="/deliver"]').click()

        //Valida se foi para a página certa
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    //Funcao para preencher o formulario
    fillForm(deliver) {
        // type é para escrever no campo
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        //Preencher o endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //Verificar se os valores que veem ao clicar em buscar CEP estão corretos
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        /* 
        Para pegar o card em que está escrito método de entrega (moto), vai usar a estrategia de busca de pegar a classe 
        aonde estão os cards e depois usar o "cy.contains" que serve para juntar a busca do css selector com o texto do card 
        */
        cy.contains('.delivery-method li', deliver.delivery_method).click()
        //Fazendo upload de imagem, utilizando a biblioteca instalada
        //Ao utilizar o CSS SELECTOR e colocar o acento circunflexo, ele vai buscar o que começa com a palavra
        //Ao utilizar o CSS SELECTOR e colocar o Cifrão ($), ele procura pelo texto que termina com a palavra
        //No CSS SELECTOR tem o *(asterisco) que busca a palavra no meio do texto- significa contém
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh) // attachFile é a função da biblioteca para fazer upload de arquivo, é passado o nome do arquivo que está dentro da pasta fixtures
    }

    submit() {
        //Clicar no botão para se cadastrar
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        //Validar que ocorreu o texto de cpf invalido
        //cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible') // busca elemento pela classe do css selector combinado com o texto
    }
}

//Exportando a classe
export default new SignupPage;
