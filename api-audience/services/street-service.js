const {StreetEntity,CityEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class StreetService{
    async create(name, cityId){
        const response = await StreetEntity.create({name, cityId});
        return response;
    }

    async getAll(){
        const response = await StreetEntity.findAll({include: [CityEntity]});
        return response;
    }

    async get(id){
        const response = await StreetEntity.findOne({where: {id}, include:[CityEntity]});

        if (!response){
            throw APIerror.badRequest("ЧЗХ"); //Исправить в будушем
        }

        return response;
    }

    async update(id, name, cityId){
        await this.get(id);

        return await StreetEntity.update({name, cityId}, {where: {id}});
    }

    async delete(id, name){
        await this.get(id);
        await CityEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new StreetService();