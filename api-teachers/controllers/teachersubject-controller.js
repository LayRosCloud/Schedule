const TeacherSubjectService = require('../Services/teachersubject-service')
const events = require("events");
const emitterSubject = new events.EventEmitter

class TeacherSubjectController {
    async getAll(request, res){
        const response = await TeacherSubjectService.getAll()
        return res.json(response)
    }

    async connect(request, res){
        console.log('connect teacherSubject')
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
        })

        emitterSubject.on('newMessage', async (message) => {
            const teachersSubjects = await TeacherSubjectService.getByTeacherId(message.id)
            res.write(`data: ${JSON.stringify(teachersSubjects)} \n\n`)
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
            emitterSubject.emit('newMessage',response)
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
            emitterSubject.emit('newMessage', response)
            return res.json(response)
        }
        catch(e){
            next(e)
        }
    }
}

function getEmitter(){
    return emitterSubject;
}

module.exports = {controller: new TeacherSubjectController(), getEmitter}