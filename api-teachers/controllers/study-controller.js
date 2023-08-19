const StudyService = require('../Services/study-service')

class StudyController {
    async getAll(request, res){
        const response = await StudyService.getAll()
        return res.json(response)
    }

    async get(request, res, next){
        const {id} = request.params

        try{
            const response = await StudyService.getById(id)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async delete(request, res, next){
        const {id} = request.params

        try{
            const response = await StudyService.delete(id)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async create(request, res, next){
        const {Name} = request.body

        try{
            const response = await StudyService.create(Name)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async update(request, res, next){
        const {Name} = request.body
        const {id} = request.params

        try{
            const response = await StudyService.update(id, Name)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }
}

module.exports = new StudyController()