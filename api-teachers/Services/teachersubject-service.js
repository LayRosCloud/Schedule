const {TeacherEntity, SubjectEntity, TeacherSubjectEntity} = require('../core/models')
const ApiError = require('../error/api-error')

class TeacherSubjectService {
    async getAll(){
        return await TeacherSubjectEntity.findAll({include: [TeacherEntity, SubjectEntity]})
    }

    async create(TeacherId, SubjectId){

        return await TeacherSubjectEntity.create({TeacherId, SubjectId})
    }

    async getById(id){
        const teacherSubject = await TeacherSubjectEntity.findOne({
            where: {id},
            include:[TeacherEntity, SubjectEntity]
        })

        if (!teacherSubject){
            throw ApiError.badRequest("не найдено")
        }

        return teacherSubject
    }

    async delete(id){
        await this.getById(id)
        await TeacherSubjectEntity.destroy({
            where: {id}
        })
        return {status:200, message: `Объект с id ${id} успешно удален!`}
    }

    async update(id, TeacherId, SubjectId){
        await this.getById(id)
        return await TeacherSubjectEntity.update({TeacherId, SubjectId}, {
            where: {id}
        })
    }
}
module.exports = new TeacherSubjectService()
