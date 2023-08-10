const client = require('../core/database/redis')

class CorpuseService {
    async getAll(){
        return JSON.parse(await client.get('corpuses'));
    }

    async create(corpuses){
        await client.set('corpuses', JSON.stringify(corpuses))
    }

}

module.exports = new CorpuseService()