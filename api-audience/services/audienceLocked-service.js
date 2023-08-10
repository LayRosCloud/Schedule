const {AudienceLockedEntity,AudienceEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class AudienceLockedService{
    async create(dateStart, dateEnd, audienceId){
        const response = await AudienceLockedEntity.create({dateStart, dateEnd, audienceId});
        return response;
    }

    async getAll(){
        const response = await AudienceLockedEntity.findAll({include: [AudienceEntity]});
        return response;
    }

    async get(id){
        const response = await AudienceLockedEntity.findOne({where: {id}, include:[AudienceEntity]});

        if (!response){
            throw APIerror.badRequest("ЧЗХ"); //Исправить в будушем
        }

        return response;
    }

    async update(id, dateStart, dateEnd, audienceId){
        await this.get(id);

        return await AudienceLockedEntity.update({dateStart, dateEnd, audienceId}, {where: {id}});
    }

    async delete(id, name){
        await this.get(id);
        await AudienceLockedEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new AudienceLockedService();