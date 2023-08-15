const client = require('../core/database/redis')

const cluster = 'corpus'

class CorpusService {
    async getAll(){
        let response = await client.hVals(cluster)
        response = response.map(res =>  JSON.parse(res))
        return response
    }

    async getById(id){
        return JSON.parse(await client.hGet(cluster, id));
    }

    async createOrUpdate(corpus){
        try{
            corpus = JSON.parse(corpus)
        }catch (e){
            await client.hSet(cluster, corpus.id, JSON.stringify(corpus))
        }
    }

}

module.exports = new CorpusService()