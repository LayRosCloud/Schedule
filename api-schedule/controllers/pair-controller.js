const service = require('../services/pair-service')

class PairController{
    async getAll(req, res){
        const {teacherSubjectId, audienceId, groupId} = req.query;

        return res.json(await service.getAll(teacherSubjectId, audienceId, groupId))
    }

    async get(req, res, next){
        const {id} = req.params

        try{
            return res.json(await service.getById(id))
        }catch (e){
            return  next(e)
        }
    }

    async create(req, res, next){
        const {dateStart, numberOfWeeks, audienceId, teacherSubjectId, groupId, timeId, dayOfWeekId, typeOfPairId} = req.body

        try{
            const response = await service.create(dateStart, numberOfWeeks, audienceId, teacherSubjectId, groupId, timeId, dayOfWeekId, typeOfPairId)
            return res.json(response)
        }catch (e){
            return  next(e)
        }
    }

    async update(req, res, next){
        const {id} = req.params
        const {dateStart, numberOfWeeks, audienceId, teacherSubjectId, groupId, timeId, dayOfWeekId, typeOfPairId} = req.body

        try{
            const response = await service.update(id, dateStart, numberOfWeeks, audienceId, teacherSubjectId, groupId, timeId, dayOfWeekId, typeOfPairId)
            return res.json(response)
        }catch (e){
            return  next(e)
        }
    }

    async delete(req, res, next){
        const {id} = req.params
        try{
            return res.json(await service.delete(id))
        }catch (e){
            return  next(e)
        }
    }
}

module.exports = new PairController()