const {AudienceLockedEntity,AudienceEntity} = require('../core/models');
const APIerror = require('../error/api-error')
class AudienceLockedService{
    async getAll(){
        const response = await AudienceLockedEntity.findAll({include: [AudienceEntity]});
        return response;
    }

    async get(id){
        const response = await AudienceLockedEntity.findOne({where: {id}, include:[AudienceEntity]});

        if (!response){
            throw APIerror.badRequest("Ошибка! Объект не найден");
        }

        return response;
    }

    async create(dateStart, dateEnd, audienceId){
        if(!dateStart || !dateEnd || !audienceId){
            throw APIerror.badBody()
        }
        const response = await AudienceLockedEntity.create({dateStart, dateEnd, audienceId});
        return await this.get(response.id);
    }

    async update(id, dateStart, dateEnd, audienceId){
        if(!dateStart || !dateEnd || !audienceId){
            throw APIerror.badBody()
        }

        await this.get(id);
        await AudienceLockedEntity.update({dateStart, dateEnd, audienceId}, {where: {id}})
        return await this.get(id);
    }

    async delete(id, name){
        await this.get(id);
        await AudienceLockedEntity.destroy({where: {id}});

        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new AudienceLockedService();