const {CorpusEntity,StreetEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class CorpusService{
    async create(name, streetId, image){
        const response = await CorpusEntity.create({name, streetId, image});
        return response;
    }

    async getAll(){
        const response = await CorpusEntity.findAll({include: [StreetEntity]});
        return response;
    }

    async get(id){
        const response = await CorpusEntity.findOne({where: {id}, include:[StreetEntity]});

        if (!response){
            throw APIerror.badRequest("ЧЗХ"); //Исправить в будушем
        }

        return response;
    }

    async update(id, name, image, streetId){
        await this.get(id);

        return await CorpusEntity.update({name, image, streetId}, {where: {id}});
    }

    async delete(id, name){
        await this.get(id);
        await CorpusEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}

module.exports = new CorpusService();