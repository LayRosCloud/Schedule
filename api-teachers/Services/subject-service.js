const {SubjectEntity} = require('../core/models')
const ApiError = require("../error/api-error");

class SubjectService {
    async getAll(){
        return await SubjectEntity.findAll()
    }

    async create(Name){
        return await SubjectEntity.create({Name})
    }

    async getById(id){
        const study = await SubjectEntity.findOne({
            where: {id}
        })

        if (!study){
            throw ApiError.badRequest("Предмет не найден")
        }

        return study
    }

    async delete(id){
        await this.getById(id)
        await SubjectEntity.destroy({
            where: {id}
        })
        return {status:200, message: `Объект с id ${id} успешно удален!`}
    }

    async update(id, Name){
        await this.getById(id)
        return await SubjectEntity.update({Name}, {
            where: {id}
        })
    }
}
module.exports = new SubjectService()