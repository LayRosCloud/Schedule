const TeacherService = require('../Services/teacher-service')
const SaveImage = require('../Scripts/SaveImage')
const events = require("events");
const emitter = new events.EventEmitter

class TeacherController {
    async getAll(request, res){
        const response = await TeacherService.getAll()

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
            const response = await TeacherService.getById(id)
            return res.json(response)
        }
        catch(e){
            return next(e)
        }
    }

    async create(request, res, next){
        const {Name, LastName, Patronymic, Phone, StudyId} = request.body

        try{
            let pathName
            if (request.files){
                const {Image} = request.files


                if (Image){
                    pathName = await SaveImage(Image, 'avatars')
                }
            }

            const response = await TeacherService.create(Name, LastName, Patronymic, Phone, StudyId, pathName)
            emitter.emit('newMessage', response)
            return res.json(response)
        }
        catch(e){
            return next(e)
        }
    }

    async delete(request, res, next){
        const {id} = request.params

        try{
            const response = await TeacherService.delete(id)
            return res.json(response)
        }
        catch(e){
            return next(e)
        }
    }

    async update(request, res, next){
        const {id} = request.params
        const {Name, LastName, Patronymic, Phone, StudyId} = request.body

        let {path} = request.body
        try{
            if(request.files && request.files.Image){
                const {Image} = request.files
                path = await SaveImage(Image, 'avatars')
            }

            const response = await TeacherService.update(id, Name, LastName, Patronymic, Phone, StudyId, path)
            emitter.emit('newMessage',response)
            return res.json(response)
        }
        catch(e){
            return next(e)
        }
    }
}
//todo
module.exports = new TeacherController()