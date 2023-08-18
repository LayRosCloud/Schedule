const client = require('../core/database/redis')
const cluster = 'teacherSubject'
class TeacherSubjectService {
    async getAll(){
        let response = await client.hVals(cluster)
        response = response.map(res =>  JSON.parse(res))
        return response
    }

    async getById(id){
        try{
            const response = await client.hGet(cluster, String(id));
            return JSON.parse(response);
        }catch (e){
            return null
        }

    }

    async updateArray(teacherSubjects){
        try{
            teacherSubjects = JSON.parse(teacherSubjects)
        }catch (e){
            console.log(e.message)
        }finally {
            for (const teacherSubject of teacherSubjects){
                await client.hSet(cluster, teacherSubject.id, JSON.stringify(teacherSubject))
            }
        }
    }
    async createOrUpdate(teacherSubject){
        try{
            teacherSubject = JSON.parse(teacherSubject)
        }catch (e){
            console.log(e.message)
        }finally {
            await client.hSet(cluster, teacherSubject.id, JSON.stringify(teacherSubject))
        }
    }

}

module.exports = new TeacherSubjectService()