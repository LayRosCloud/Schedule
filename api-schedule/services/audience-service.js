const client = require('../core/database/redis')

class AudienceService {
    async getAll(){
        return JSON.parse(await client.get('audiences'));
    }

    async create(audiences){
        await client.set('audiences', JSON.stringify(audiences))
    }

}

module.exports = new AudienceService()