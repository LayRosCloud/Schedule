const client = require('../core/database/redis')
const cluster = 'teacher'
class TeacherService {
    async getById(id){
        return JSON.parse(await client.get(`${cluster}-${id}`));
    }

    async createOrUpdate(teacher){
        try{
            teacher = JSON.parse(teacher)
        }catch (e){
            console.log(e.message)
        }
        finally {
            await client.set(`${cluster}-${teacher.id}`, JSON.stringify(teacher))
        }
    }

}

module.exports = new TeacherService()