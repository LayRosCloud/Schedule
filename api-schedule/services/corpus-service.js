const client = require('../core/database/redis')

const cluster = 'corpus'

class CorpusService {
    async getById(id){
        return JSON.parse(await client.get(`${cluster}-${id}`));
    }

    async createOrUpdate(corpus){
        try{
            corpus = JSON.parse(corpus)
        }catch (e){
            await client.set(`${cluster}-${corpus.id}`, JSON.stringify(corpus))
        }
    }

}

module.exports = new CorpusService()