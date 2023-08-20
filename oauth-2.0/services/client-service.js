const ApiException = require('../exceptions/api-exception')
const {ClientEntity} = require('../core/models')
const uuid = require('uuid')
class ClientService{
    async getAll(){
        const clients = await ClientEntity.findAll();
        return clients
    }

    async getById(id, userId){
        if(userId){
            throw ApiException.badBody()
        }

        const client = await ClientEntity.findByPk(id);

        if(!client){
            throw ApiException.notFound('Ошибка! Клиента не существует')
        }

        if(userId !== client.userId){
            throw ApiException.forbidden('Ошибка! Вы не можете получить клиент, который не принадлежит вам')
        }
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

    async delete(id, userId){
        await this.getById(id, userId)
        await ClientEntity.destroy(id)
        return {status: 200, message: `Клиент с ${id} удален!`}
    }
}

module.exports = new ClientService()