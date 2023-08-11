const TeacherSubjectService = require('../Services/teachersubject-service')
const events = require("events");
const emitter = new events.EventEmitter

class TeacherSubjectController {
    async getAll(request, res){
        const response = await TeacherSubjectService.getAll()
        return res.json(response)
    }

    async connect(request, res){
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
        })
        emitter.on('newMessage', (message) => {
            res.write(`data: ${JSON.stringify(message)} \n\n`)
        })
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
            emitter.emit('newMessage',response)
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
            emitter.emit('newMessage',response)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }
}

module.exports = new TeacherSubjectController()