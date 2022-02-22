var faker = require('faker') //faker para usar dados dinamicos
// dá pra usar importar assim tambem - import faker from 'faker'
var cpf = require('gerador-validador-cpf')
// dá pra usar importar assim tambem - import * as cpf from 'gerador-validador-cpf'
//exportando um modulo
export default {

    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
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
        }

        return data
    }
}