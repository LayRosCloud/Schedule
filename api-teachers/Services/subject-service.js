const {SubjectEntity} = require('../core/models')
const ApiError = require("../error/api-error");

class SubjectService {
    async getAll(){
        return await SubjectEntity.findAll()
    }

    async create(Name, FullName){
        if(!FullName){
            throw ApiError.badBody()
        }

        const response = await SubjectEntity.create({Name,FullName})

        return await this.getById(response.id)
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

    async update(id, Name, FullName){
        if(!FullName){
            throw ApiError.badBody()
        }
        await this.getById(id)
        await SubjectEntity.update({FullName, Name}, {
            where: {id}
        })
        return await this.getById(id)
    }
}
module.exports = new SubjectService()