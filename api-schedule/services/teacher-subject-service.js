const client = require('../core/database/redis')
const cluster = 'teacherSubject'
class TeacherSubjectService {
    async getById(id){
        return JSON.parse(await client.get(`${cluster}-${id}`));
    }
    async updateArray(teacherSubjects){
        try{
            teacherSubjects = JSON.parse(teacherSubjects)
        }catch (e){
            console.log(e.message)
        }finally {
            for (const teacherSubject of teacherSubjects){
                await client.set(`${cluster}-${teacherSubject.id}`, JSON.stringify(teacherSubject))
            }
        }
    }
    async createOrUpdate(teacherSubject){
        try{
            teacherSubject = JSON.parse(teacherSubject)
        }catch (e){
            console.log(e.message)
        }finally {//

            await client.set(`${cluster}-${teacherSubject.id}`, JSON.stringify(teacherSubject))
        }
    }

}

module.exports = new TeacherSubjectService()