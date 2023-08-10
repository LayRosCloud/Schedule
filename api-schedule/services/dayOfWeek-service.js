const {DayOfWeekEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

class DayOfWeekService {
    async getAll(){
        const response = await DayOfWeekEntity.findAll();
        return response;
    }

    async getById(id){
        const response = await DayOfWeekEntity.findOne({where: {id}})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }

    async create(name){
        if(!name){
            throw ApiException.badBody()
        }

        return await DayOfWeekEntity.create({name})
    }

    async update(id, name){
        if(!name){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await DayOfWeekEntity.update({name}, {where: {id}})
        return this.getById(id)
    }

    async delete(id){
        await this.getById(id)
        await DayOfWeekEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new DayOfWeekService()