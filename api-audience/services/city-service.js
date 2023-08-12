const {CityEntity, RegionEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class CityService{
    async getAll(){
        const response = await CityEntity.findAll({include: [RegionEntity]});
        return response;
    }

    async get(id){
        const response = await CityEntity.findOne({where: {id}, include:[RegionEntity]});

        if (!response){
            throw APIerror.badRequest("Ошибка! Объект не найден")
        }

        return response;
    }

    async create(name, regionId){
        if(!name || regionId){
            throw APIerror.badBody()
        }
        const response = await CityEntity.create({name, regionId});
        return this.get(response.id);
    }

    async update(id, name, regionId){
        if(!name || !regionId){
            throw APIerror.badBody()
        }
        await this.get(id);
        await CityEntity.update({name, regionId}, {where: {id}})
        return await this.get(id);
    }

    async delete(id, name){
        await this.get(id);
        await CityEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new CityService();