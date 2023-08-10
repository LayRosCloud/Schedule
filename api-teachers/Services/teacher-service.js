const {TeacherEntity, StudyEntity} = require('../core/models')
const ApiError = require('../error/api-error')

class TeacherService {
    async getAll(){
        return await TeacherEntity.findAll({include: [StudyEntity]})
    }

    async create(Name, LastName, Patronymic, Phone, StudyId = null, Image = null){
        return await TeacherEntity.create({Name, LastName, Patronymic, Phone, StudyId, Image})
    }

    async getById(id){
        const teacher = await TeacherEntity.findOne({
            where: {id},
            include:[StudyEntity]
        })

        if (!teacher){
            throw ApiError.badRequest("Учитель не найден")
        }

        return teacher
    }

    async delete(id){
        await this.getById(id)
        await TeacherEntity.destroy({
            where: {id}
        })
        return {status:200, message: `Объект с id ${id} успешно удален!`}
    }

    async update(id, Name, LastName, Patronymic, Phone, StudyId = null, Image = null){
        await this.getById(id)
        return await TeacherEntity.update({Name, LastName, Patronymic, Phone, StudyId, Image}, {
            where: {id}
        })
    }
}
module.exports = new TeacherService()
