const {PairEntity, GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

class PairService {
    async getAll(teacherId, audienceId, groupId){
        const include = {include: [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]}
        let response = await PairEntity.findAll({
            ...include
        })
        
        if(teacherId){
            response = response.filter((t)=>t.teacherId === teacherId)
        }

        if(audienceId){
            response = response.filter((t)=>t.teacherId === audienceId)
        }

        if(groupId){
            response = response.filter((t)=>t.teacherId === groupId)
        }

        return response;
    }


    async getById(id){
        const response = await PairEntity.findOne({where: {id}, include: [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }

    async create(dateStart, numberOfWeeks, audienceId, teacherId, groupId, timeId, dayOfWeekId, typeOfPairId){
        if(!dateStart || !numberOfWeeks || !audienceId || !teacherId || !groupId || !timeId || !dayOfWeekId || !typeOfPairId){
            throw ApiException.badBody()
        }

        return await PairEntity.create({ dateStart,
            numberOfWeeks,
            audienceId,
            teacherId,
            groupId,
            timeId,
            dayOfWeekId,
            typeOfPairId})
    }

    async update(id, dateStart, numberOfWeeks, audienceId, teacherId, groupId, timeId, dayOfWeekId, typeOfPairId){
        if(!dateStart || !numberOfWeeks || !audienceId || !teacherId || !groupId || !timeId || !dayOfWeekId || !typeOfPairId){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await PairEntity.update({ dateStart,
                    numberOfWeeks,
                    audienceId,
                    teacherId,
                    groupId,
                    timeId,
                    dayOfWeekId,
                    typeOfPairId}, {where: {id}})
        return this.getById(id)
    }

    async delete(id){
        await this.getById(id)
        await PairEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new PairService()