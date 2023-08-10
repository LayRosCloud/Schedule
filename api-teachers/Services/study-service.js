const {StudyEntity, TeacherEntity} = require('../core/models')
const ApiError = require("../error/api-error");

class StudyService {
    async getAll(){
        return await StudyEntity.findAll()
    }

    async create(Name){
        return await StudyEntity.create({Name})
    }

    async getById(id){
        const study = await StudyEntity.findOne({
            where: {id}
        })

        if (!study){
            throw ApiError.badRequest("Место обучения не найдено")
        }

        return study
    }

    async delete(id){
        await this.getById(id)
        await StudyEntity.destroy({
            where: {id}
        })
        return {status:200, message: `Объект с id ${id} успешно удален!`}
    }

    async update(id, Name){
        await this.getById(id)
        return await StudyEntity.update({Name}, {
            where: {id}
        })
    }
}
module.exports = new StudyService()
