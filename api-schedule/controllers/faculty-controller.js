const service = require('../services/faculty-service')

class FacultyController{
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
        const {name,collegeId} = req.body

        try{
            return res.json(await service.create(name,collegeId))
        }catch (e){
            return  next(e)
        }
    }

    async update(req, res, next){
        const {id} = req.params
        const {name,collegeId} = req.body

        try{
            return res.json(await service.update(id, name,collegeId))
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

module.exports = new FacultyController()