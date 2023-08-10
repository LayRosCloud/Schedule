const client = require('../core/database/redis')

class TeacherService {
    async getAll(){
        return JSON.parse(await client.get('teacher'));
    }

    async create(teachers){
        await client.set('teacher', JSON.stringify(teachers))
    }

}

module.exports = new TeacherService()