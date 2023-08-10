const {RegionEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class RegionService{
    async create(name){
        const response = await RegionEntity.create({name});
        return response;
    }

    async getAll(){
        const response = await RegionEntity.findAll();
        return response;
    }

    async get(id){
        const response = await RegionEntity.findOne({where: {id}});

        if (!response){
            throw APIerror.badRequest("ЧЗХ") //Исправить в будушем
        }

        return response;
    }

    async update(id, name){
       await this.get(id);

       return await RegionEntity.update({name}, {where: {id}});
    }

    async delete(id, name){
        await this.get(id);
        await RegionEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new RegionService();