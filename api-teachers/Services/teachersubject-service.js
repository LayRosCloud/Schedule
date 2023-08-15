const {TeacherEntity, SubjectEntity, TeacherSubjectEntity, StudyEntity} = require('../core/models')
const ApiError = require('../error/api-error')
const include = [SubjectEntity, {model: TeacherEntity, include: [StudyEntity]}]
const attributes = ['id']
class TeacherSubjectService {
    async getAll(){
        return await TeacherSubjectEntity.findAll({attributes, include})
    }

    async getByTeacherId(TeacherId){
        const response = await TeacherSubjectEntity.findAll({
            attributes,
            include,
        where:{
            TeacherId
        }})
        return response
    }

    async create(TeacherId, SubjectId){
        if(!TeacherId || !SubjectId){
            throw ApiError.badBody()
        }
        const response = await TeacherSubjectEntity.create({TeacherId, SubjectId})
        return this.getById(response.id)
    }

    async getById(id){
        const teacherSubject = await TeacherSubjectEntity.findOne({
            attributes,
            where: {id},
            include
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
        if(!TeacherId || !SubjectId){
            throw ApiError.badBody()
        }
        await this.getById(id)
        await TeacherSubjectEntity.update({TeacherId, SubjectId}, {
            where: {id}
        })
        return this.getById(id)
    }
}
module.exports = new TeacherSubjectService()
