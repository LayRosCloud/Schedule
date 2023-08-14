const {PairEntity, GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')
const TeacherSubjectService = require('./teacher-subject-service')
const AudienceService = require('./audience-service')
const PairDto = require('../core/dto/PairDto')

function getDateWithoutTime(dateTime) {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
}

class PairService {
    async getAll(teacherSubjectId, audienceId, groupId, isCurrentDate){
		
		let pairs = await this.#getFromDatabase(teacherSubjectId, audienceId, groupId)

        if(isCurrentDate){
            pairs = this.#filterOnCurrentDate(pairs)
        }

        pairs = await Promise.all(pairs.map(async (pair) => {
			const teacherSubject = await TeacherSubjectService.getById(pair.teacherSubjectId);
			const audience = await AudienceService.getById(pair.audienceId);
			return new PairDto(pair, teacherSubject, audience);
		}));
        return pairs;
    }
    async #getFromDatabase(teacherSubjectId, audienceId, groupId){
        const include = {include: [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]}
        const where = {}

        if(teacherSubjectId) where.teacherSubjectId = teacherSubjectId;
        if(audienceId) where.audienceId = audienceId;
        if(groupId) where.groupId = groupId;

        return await PairEntity.findAll({...include, where})
    }

    #filterOnCurrentDate(pairs){
        const filteredList = []
        const currentDate = getDateWithoutTime(new Date());
        const currentDateWithWeek = getDateWithoutTime(currentDate)

        currentDateWithWeek.setDate(currentDateWithWeek.getDate() + 7);

        pairs.map(pair => {
            const dateStart = getDateWithoutTime(pair.dateStart)
            const dateEnd = new Date(dateStart);

            const numberOfDays = pair.numberOfWeeks * 7

            dateEnd.setDate(dateEnd.getDate() + numberOfDays)

            if(currentDate >= dateStart && currentDate < dateEnd || currentDateWithWeek >= dateStart && currentDateWithWeek < dateEnd){
                filteredList.push(pair)
            }
        })
        return filteredList
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