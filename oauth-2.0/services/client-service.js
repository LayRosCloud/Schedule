const ApiException = require('../exceptions/api-exception')
const {ClientEntity} = require('../core/models')
const uuid = require('uuid')
class ClientService{
    async getById(id){
        const client = await ClientEntity.findByPk(id);
        return client;
    }
    async create(userId){
        if(!userId){
            return ApiException.badBody()
        }
        const clientSecret = uuid.v4();
        const client = await ClientEntity.create({clientSecret, userId})
        return client
    }
}

module.exports = new ClientService()