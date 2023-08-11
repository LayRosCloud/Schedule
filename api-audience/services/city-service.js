const {CityEntity, RegionEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class CityService{
    async create(name, regionId){
        const response = await CityEntity.create({name, regionId});
        return response;
    }

    async getAll(){
        const response = await CityEntity.findAll({include: [RegionEntity]});
        return response;
    }

    async get(id){
        const response = await CityEntity.findOne({where: {id}, include:[RegionEntity]});

        if (!response){
            throw APIerror.badRequest("ЧЗХ") //TODO:Исправить
        }

        return response;
    }

    async update(id, name, regionId){
        await this.get(id);

        return await CityEntity.update({name, regionId}, {where: {id}});
    }

    async delete(id, name){
        await this.get(id);
        await CityEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new CityService();