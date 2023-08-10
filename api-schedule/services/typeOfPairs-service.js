const {TypeOfPairEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

class TypeOfPairsService {
    async getAll(){
        const response = await TypeOfPairEntity.findAll();
        return response;
    }
    async getById(id){
        const response = await TypeOfPairEntity.findOne({where: {id}})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }
    async create(name, color){

        if(!name || !color){
            throw ApiException.badBody()
        }

        return await TypeOfPairEntity.create({name, color})
    }
    async update(id, name, color){
        if(!name || !color){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await TypeOfPairEntity.update({name, color}, {where: {id}})
        return this.getById(id)
    }
    async delete(id){
        await this.getById(id)
        await TypeOfPairEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new TypeOfPairsService()