const {GroupEntity, CourseEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

class GroupService {
    async getAll(){
        const response = await GroupEntity.findAll({include: [CourseEntity]});
        return response;
    }
    async getById(id){
        const response = await GroupEntity.findOne({where: {id}, include: [CourseEntity]})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }
    async create(name, courseId){
        if(!name || !courseId){
            throw ApiException.badBody()
        }

        return await GroupEntity.create({name, courseId})
    }
    async update(id, name, courseId){
        if(!name || !courseId){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await GroupEntity.update({name, courseId}, {where: {id}})
        return this.getById(id)
    }
    async delete(id){
        await this.getById(id)
        await GroupEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new GroupService()