const client = require('../core/database/redis')
const cluster = 'teacherSubject'
class TeacherSubjectService {
    async getById(id){
        return JSON.parse(await client.get(`${cluster}-${id}`));
    }

    async createOrUpdate(teacherSubject){
        try{
            teacherSubject = JSON.parse(teacherSubject)
        }catch (e){
            await client.set(`${cluster}-${teacherSubject.id}`, JSON.stringify(teacherSubject))
        }
    }

}

module.exports = new TeacherSubjectService()