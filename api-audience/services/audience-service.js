const {AudienceEntity,CorpusEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class AudienceService{
    async create(name, corpuId){
        const response = await AudienceEntity.create({name, corpuId});
        return response;
    }

    async getAll(){
        const response = await AudienceEntity.findAll({include: [CorpusEntity]});
        return response;
    }

    async get(id){
        const response = await AudienceEntity.findOne({where: {id}, include:[CorpusEntity]});

        if (!response){
            throw APIerror.badRequest("ЧЗХ"); //Исправить в будушем
        }

        return response;
    }

    async update(id, name, corpuId){
        await this.get(id);

        return await AudienceEntity.update({name, corpuId}, {where: {id}});
    }

    async delete(id, name){
        await this.get(id);
        await AudienceEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}

module.exports = new AudienceService();