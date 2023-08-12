const {StreetEntity,CityEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class StreetService{
    async getAll(){
        const response = await StreetEntity.findAll({include: [CityEntity]});
        return response;
    }

    async get(id){
        const response = await StreetEntity.findOne({where: {id}, include:[CityEntity]});

        if (!response){
            throw APIerror.badRequest("Ошибка! Объект не найден!");
        }

        return response;
    }

    async create(name, cityId){
        if(!name || !cityId ){
            throw APIerror.badBody()
        }
        const response = await StreetEntity.create({name, cityId});
        return this.get(response.id);
    }

    async update(id, name, cityId){
        if(!name || !cityId ){
            throw APIerror.badBody()
        }
        await this.get(id);

        await StreetEntity.update({name, cityId}, {where: {id}});
        return this.get(id)
    }

    async delete(id){
        await this.get(id);
        await CityEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new StreetService();