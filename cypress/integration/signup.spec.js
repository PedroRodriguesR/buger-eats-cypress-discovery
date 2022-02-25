import signupPage from '../Pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', () => {

    /* //para poder usar as funções da classe SignupPage é preciso instancia-la
    var signup = new SignupPage() - Porém, na page de signup vamos exportar a classe ja instanciada usando a palavra "new" */

    //Ganchos em cypress
    /*   before(() => {
          cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
      })
  
      beforeEach(function () {
          cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
      })
  
      after(function () {
          cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
      })
  
      afterEach(function () {
          cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
      }) 
    */

    /*     Seria para usar os dados contidos no json deliver que está em fixture   
    beforeEach(function () {
        //fixture é a função que busca o arquivo de massa de teste na pasta de fixture, e fixture é uma promise
        //then para pegar o resultado da promise
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    }) */

    //.skip = pula o caso de teste
    it('User should be deliver', function () {

        /*  Declarando um objeto que vai conter todos os dados do teste, porem usando fixtures deixamos a massa no json deliver.json
        var deliver = {
            name: 'Pedro Rojas',
            cpf: '00000014141',
            email: 'exemplo@teste.com',
            whatsapp: '11999999999',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Ap 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }  */

        //Usando a factory
        var deliver = signupFactory.deliver()

        // usando a page SignupPage, é utilizado o padrão de projeto chamado "page object"
        signupPage.go()
        //signup.fillForm(this.deliver.signup) - usando fixture
        signupPage.fillForm(deliver)
        signupPage.submit()

        //Validar o texto que deu certo
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {
        var deliver = signupFactory.deliver()
        //alterado o cpf para ficar invalido
        deliver.cpf = 'x00000141AA'
        signupPage.go()
        // signup.fillForm(this.deliver.cpf_inv) - usando fixture
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {
        var deliver = signupFactory.deliver()
        // Alterando o email para ficar invalido
        deliver.email = 'exemplo.invalido.teste.com'
        signupPage.go()
        // signup.fillForm(this.deliver.email_inv) - usando fixture
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    /* it('Required fields', function(){
    // Esse teste é procedural, linha por linha, logo se der erro em alguma validação o teste não vai conferir todas as 
    // validações e vai abortar. Pra isso será usado o teste dentro de um loop (teste abaixo) 

        signupPage.go()
        signupPage.submit()

        signupPage.alertMessageShouldBe('É necessário informar o nome')
        signupPage.alertMessageShouldBe('É necessário informar o CPF')
        signupPage.alertMessageShouldBe('É necessário informar o email')
        signupPage.alertMessageShouldBe('É necessário informar o CEP')
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        signupPage.alertMessageShouldBe('Selecione o método de entrega')
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    }) */

    context('Required fields', () => {

        //Criar um array de objetos chave e valor, onde a chave é a propriedade e o valor é a msg 
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CPF' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        //Esse before é feito para executar os passos do teste que não são validações
        before(() => {
            signupPage.go()
            signupPage.submit()
        })

        //Agora é um loop nas messagens pra fazer teste usando cada mensagem 
        //Esse teste, é um teste dinamico e ele não falha se ocorrer algum erro de validação, ele continua validando todos os campos
        messages.forEach((msg) => {
            it(`${msg.field} is required`, function () {
                signupPage.alertMessageShouldBe(msg.output)
            })
        })

    })
})