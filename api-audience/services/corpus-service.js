const {CorpusEntity,StreetEntity, CityEntity, RegionEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class CorpusService{
    async getAll(){
        const response = await CorpusEntity.findAll({include: [{
                model: StreetEntity,
                include: [{
                    model: CityEntity,
                    include: [{
                        model: RegionEntity
                    }]
                }]
            }]});
        return response;
    }

    async get(id){
        const response = await CorpusEntity.findOne({where: {id}, include: [{
                model: StreetEntity,
                include: [{
                    model: CityEntity,
                    include: [{
                        model: RegionEntity
                    }]
                }]
            }]});

        if (!response){
            throw APIerror.badRequest('Ошибка! Объект не найден!');
        }

        return response;
    }

    async create(name, streetId, image, numberOfHome){
        if(!name || !streetId || !numberOfHome){
            throw APIerror.badBody()
        }
        const response = await CorpusEntity.create({name, streetId, image, numberOfHome});
        return this.get(response.id);
    }

    async update(id, name, image, streetId, numberOfHome){
        if(!name || !streetId || !numberOfHome){
            throw APIerror.badBody()
        }
        await this.get(id);
        await CorpusEntity.update({name, image, streetId, numberOfHome}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id);
        await CorpusEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}

module.exports = new CorpusService();