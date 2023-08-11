const client = require('../core/database/redis')
const cluster = 'audience'

class AudienceService {
    async getById(id){
        return JSON.parse(await client.get(`${cluster}-${id}`));
    }

    async createOrUpdate(audience){
        try{
            audience = JSON.parse(audience)
        }catch (e){
            await client.set(`${cluster}-${audience.id}`, JSON.stringify(audience))
        }
    }

}

module.exports = new AudienceService()