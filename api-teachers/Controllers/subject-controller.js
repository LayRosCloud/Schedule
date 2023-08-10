const SubjectService = require('../Services/subject-service')

class SubjectController {
    async getAll(request, res){
        const response = await SubjectService.getAll()
        return res.json(response)
    }

    async get(request, res, next){
        const {id} = request.params

        try{
            const response = await SubjectService.getById(id)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async delete(request, res, next){
        const {id} = request.params

        try{
            const response = await SubjectService.delete(id)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async create(request, res, next){
        const {Name} = request.body

        try{
            const response = await SubjectService.create(Name)
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
            const response = await SubjectService.update(id, Name)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }
}

module.exports = new SubjectController()