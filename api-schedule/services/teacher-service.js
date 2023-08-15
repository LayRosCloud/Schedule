const client = require('../core/database/redis')
const cluster = 'teacher'
class TeacherService {
    async getAll(){
        let response = await client.hVals(cluster)
        response = response.map(res =>  JSON.parse(res))
        return response
    }

    async getById(id){
        return JSON.parse(await client.hGet(cluster, id));
    }

    async createOrUpdate(teacher){
        try{
            teacher = JSON.parse(teacher)
        }catch (e){
            console.log(e.message)
        }
        finally {
            await client.hSet(`${cluster}`, teacher.id, JSON.stringify(teacher))
        }
    }

}

module.exports = new TeacherService()