const {AudienceEntity,CorpusEntity,StreetEntity} = require('../core/models');
const APIerror = require('../error/api-error')

const include = [{model: CorpusEntity, include: [StreetEntity]}]
const attributes = ['id', 'name']
class AudienceService{
    async getAll(){
        const response = await AudienceEntity.findAll({attributes, include})
        return response;
    }

    async get(id){
        const response = await AudienceEntity.findOne({attributes, where: {id}, include});

        if (!response){
            throw APIerror.badRequest("Ошибка! Объект не найден");
        }

        return response;
    }

    async create(name, corpuId){
        if(!name || !corpuId){
            throw APIerror.badBody()
        }
        const response = await AudienceEntity.create({name, corpuId});
        return this.get(response.id);
    }

    async update(id, name, corpuId){
        if(!name || !corpuId){
            throw APIerror.badBody()
        }
        await this.get(id);
        await AudienceEntity.update({name, corpuId}, {where: {id}});
        return await this.get(id);
    }

    async delete(id, name){
        await this.get(id);
        await AudienceEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}

module.exports = new AudienceService();