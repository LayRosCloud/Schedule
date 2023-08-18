const client = require('../core/database/redis')
const ApiException = require("../exceptions/ApiException");
const cluster = 'teacher'
class TeacherService {
    async getAll(){
        let response = await client.hVals(cluster)
        response = response.map(res =>  JSON.parse(res))
        return response
    }

    async getById(id){
        const response = await client.hGet(cluster, String(id))

        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }

        return JSON.parse(response);
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