const client = require('../core/database/redis')

class TeacherSubjectService {
    async getAll(){
        return JSON.parse(await client.get('teacherSubjects'));
    }

    async create(teachersSubject){
        await client.set('teacherSubjects', JSON.stringify(teachersSubject))
    }

}

module.exports = new TeacherSubjectService()