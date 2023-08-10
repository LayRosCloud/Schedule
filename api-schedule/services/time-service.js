const {TimeEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

class TimeService {
    async getAll(){
        const response = await TimeEntity.findAll();
        return response;
    }
    async getById(id){
        const response = await TimeEntity.findOne({where: {id}})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }
    async create(name){
        if(!name){
            throw ApiException.badBody()
        }

        return await TimeEntity.create({name})
    }
    async update(id, name){
        if(!name){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await TimeEntity.update({name}, {where: {id}})
        return this.getById(id)
    }
    async delete(id){
        await this.getById(id)
        await TimeEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new TimeService()