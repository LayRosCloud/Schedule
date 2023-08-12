const {PairEntity, GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')
const TeacherSubjectService = require('./teacher-subject-service')
const AudienceService = require('./audience-service')
const PairDto = require('../core/dto/PairDto')

class PairService {
    async getAll(teacherSubjectId, audienceId, groupId){
        const include = {include: [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]}
        const where = {}
		
		if(teacherSubjectId) where.teacherSubjectId = teacherSubjectId;
		if(audienceId) where.audienceId = audienceId;
		if(groupId) where.groupId = groupId;
		
		const response = await PairEntity.findAll({...include, where})
		
        const result = await Promise.all(response.map(async (item) => {
			const teacherSubject = await TeacherSubjectService.getById(item.teacherSubjectId);
			const audience = await AudienceService.getById(item.audienceId);
			return new PairDto(item, teacherSubject, audience);
		}));
        return result;
    }


    async getById(id){
        const response = await PairEntity.findOne({where: {id}, include: [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        response.teacher = {message: 'text'}
        return response;
    }

    async create(dateStart, numberOfWeeks, audienceId, teacherSubjectId, groupId, timeId, dayOfWeekId, typeOfPairId){
        if(!dateStart || !numberOfWeeks || !audienceId || !teacherSubjectId || !groupId || !timeId || !dayOfWeekId || !typeOfPairId){
            throw ApiException.badBody()
        }

        return await PairEntity.create({ dateStart,
            numberOfWeeks,
            audienceId,
            teacherSubjectId,
            groupId,
            timeId,
            dayOfWeekId,
            typeOfPairId})
    }

    async update(id, dateStart, numberOfWeeks, audienceId, teacherSubjectId, groupId, timeId, dayOfWeekId, typeOfPairId){
        if(!dateStart || !numberOfWeeks || !audienceId || !teacherSubjectId || !groupId || !timeId || !dayOfWeekId || !typeOfPairId){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await PairEntity.update({ dateStart,
                    numberOfWeeks,
                    audienceId,
                    teacherSubjectId,
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