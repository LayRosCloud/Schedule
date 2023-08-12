const {StudyEntity} = require('../core/models')
const ApiError = require("../error/api-error");

class StudyService {
    async getAll(){
        return await StudyEntity.findAll()
    }

    async create(Name){
        if(!Name){
            throw ApiError.badBody()
        }
        const response = await StudyEntity.create({Name});
        return this.getById(response.id)
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
        if(!Name){
            throw ApiError.badBody()
        }
        await this.getById(id)
        await StudyEntity.update({Name}, {
            where: {id}
        })
        return await this.getById(id)
    }
}
module.exports = new StudyService()
