const {RegionEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class RegionService{
    async getAll(){
        const response = await RegionEntity.findAll();
        return response;
    }

    async get(id){
        const response = await RegionEntity.findOne({where: {id}});

        if (!response){
            throw APIerror.badRequest("Ошибка! Объект не найден")
        }

        return response;
    }

    async create(name){
        if(!name ){
            throw APIerror.badBody()
        }
        const response = await RegionEntity.create({name});
        return this.get(response.id);
    }

    async update(id, name){
        if(!name ){
            throw APIerror.badBody()
        }
       await this.get(id);
        await RegionEntity.update({name}, {where: {id}})
       return await this.get(id);
    }

    async delete(id, name){
        await this.get(id);
        await RegionEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new RegionService();