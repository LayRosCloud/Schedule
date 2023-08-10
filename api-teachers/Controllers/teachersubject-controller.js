const TeacherSubjectService = require('../Services/teachersubject-service')

class TeacherSubjectController {
    async getAll(request, res){
        const response = await TeacherSubjectService.getAll()
        return res.json(response)
    }

    async get(request, res, next){
        const {id} = request.params

        try{
            const response = await TeacherSubjectService.getById(id)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async delete(request, res, next){
        const {id} = request.params

        try{
            const response = await TeacherSubjectService.delete(id)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async create(request, res, next){
        const {TeacherId, SubjectId} = request.body
        try{
            const response = await TeacherSubjectService.create(TeacherId, SubjectId)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }

    async update(request, res, next){
        const {TeacherId, SubjectId} = request.body
        const {id} = request.params

        try{
            const response = await TeacherSubjectService.update(id, TeacherId, SubjectId)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }
}

module.exports = new TeacherSubjectController()