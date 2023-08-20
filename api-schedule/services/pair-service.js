const {PairEntity, GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')
const TeacherSubjectService = require('./teacher-subject-service')
const AudienceService = require('./audience-service')
const PairDto = require('../core/dto/PairDto')
const { Op } = require("sequelize");

function getDateWithoutTime(dateTime) {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
}

const include = [GroupEntity, TimeEntity, DayOfWeekEntity, TypeOfPairEntity]
const attributes = ['id','dateStart','dateEnd','teacherSubjectId', 'audienceId']
class PairService {
    async getAll(teacherSubjectId, audienceId, groupId, isCurrentDate){
		
		let pairs = await this.#getFromDatabase(teacherSubjectId, audienceId, groupId, isCurrentDate)

        pairs = await Promise.all(pairs.map(async (pair) => {
            try{
                const teacherSubject = await TeacherSubjectService.getById(String(pair.teacherSubjectId));
                const audience = await AudienceService.getById(String(pair.audienceId));
                return new PairDto(pair, teacherSubject, audience);
            }catch (e){
                console.log(e.message)
            }

		}));
        return pairs;
    }
	
    async #getFromDatabase(teacherSubjectId, audienceId, groupId, isCurrentDate){
        const where = {}

        if(teacherSubjectId) where.teacherSubjectId = teacherSubjectId;
        if(audienceId) where.audienceId = audienceId;
        if(groupId) where.groupId = groupId;
        if(isCurrentDate) {
            const currentDate = getDateWithoutTime(new Date());
            const nextWeekDate = getDateWithoutTime(new Date(currentDate));
            nextWeekDate.setDate(nextWeekDate.getDate() + 7)
            where.dateStart = {
                [Op.lt]: nextWeekDate
            }
            where.dateEnd = {
                [Op.gte]:currentDate
            }
        }

        return await PairEntity.findAll({
            attributes,
            where,
            include,
        })
    }

    async getById(id){
        const response = await PairEntity.findOne({attributes, where: {id}, include})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        const teacherSubject = await TeacherSubjectService.getById(response.teacherSubjectId);
        const audience = await AudienceService.getById(response.audienceId);
        return new PairDto(response, teacherSubject, audience);
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