const {PairEntity, GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')
const TeacherService = require('./teacher-service')
const AudienceService = require('./audience-service')
const PairDto = require('../core/dto/PairDto')

class PairService {
    async getAll(teacherId, audienceId, groupId){
        const include = {include: [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]}
        let response = null

        if(!teacherId && !audienceId && !groupId){
            response = await PairEntity.findAll({
                ...include
            })
        }
        else if(!teacherId && !audienceId && groupId){
            response = await PairEntity.findAll({where: {groupId},
                ...include
            })
        }
        else if(!teacherId && audienceId && !groupId){
            response = await PairEntity.findAll({where: {audienceId},
                ...include
            })
        }
        else if(teacherId && !audienceId && !groupId){
            response = await PairEntity.findAll({where: {teacherId},
                ...include
            })
        }
        else if(!teacherId && audienceId && groupId){
            response = await PairEntity.findAll({where: {audienceId, groupId},
                ...include
            })
        }
        else if(teacherId && audienceId && !groupId){
            response = await PairEntity.findAll({where: {audienceId, teacherId},
                ...include
            })
        }
        else if(teacherId && !audienceId && groupId){
            response = await PairEntity.findAll({where: {groupId, teacherId},
                ...include
            })
        }
        else if(teacherId && audienceId && groupId){
            response = await PairEntity.findAll({where: {groupId, teacherId, audienceId},
                ...include
            })
        }

        const result = []
        for (let i = 0; i < response.length; i++) {
            const teacher = await TeacherService.getById(response[i].teacherId)
            const audience = await AudienceService.getById(response[i].audienceId)
            const dto = new PairDto(response[i], teacher, audience)
            result.push(dto)
        }
        return result;//
    }


    async getById(id){
        const response = await PairEntity.findOne({where: {id}, include: [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        response.teacher = {message: 'text'}
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