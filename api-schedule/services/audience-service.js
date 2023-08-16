const client = require('../core/database/redis')
const cluster = 'audience'
const ApiException = require('../exceptions/ApiException')

class AudienceService {
    async getAll(){
        let response = await client.hVals(cluster)
        response = response.map(res =>  JSON.parse(res))
        return response
    }

    async getById(id){
        const response = await client.hGet(cluster, id);
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return JSON.parse(response);
    }

    async createOrUpdate(audience){
        try{
            audience = JSON.parse(audience)
        }catch (e){
            console.log(e.message)
        }finally {
            await client.hSet(cluster, audience.id, JSON.stringify(audience))
        }
    }

}

module.exports = new AudienceService()