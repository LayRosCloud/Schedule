const service = require('../services/dayOfWeek-service')

class DayOfWeekController{
    async getAll(req, res){
        return res.json(await service.getAll())
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
        const {name} = req.body

        try{
            return res.json(await service.create(name))
        }catch (e){
            return  next(e)
        }
    }

    async update(req, res, next){
        const {id} = req.params
        const {name} = req.body

        try{
            return res.json(await service.update(id, name))
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

module.exports = new DayOfWeekController()