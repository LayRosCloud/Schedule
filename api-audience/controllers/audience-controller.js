const service = require('../services/audience-service');
const events = require("events");
const emitter = new events.EventEmitter

class AudienceController{
    async create(req, res, next){
        const {name, corpusId} = req.body;

        try {
            const response = await service.create(name, corpusId);
            emitter.emit('newMessage',response)
            return res.json(response);
        }
        catch (e){
            return next(e);
        }
    }

    async getAll(req, res){
        const response = await service.getAll();
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
    
    async get(req, res, next){
        const {id} = req.params;

        try {
            return res.json(await service.get(id));
        }
        catch (e){
            return next(e);
        }
    }

    async update(req, res, next){
        const {id} = req.params;
        const {name, corpusId} = req.body;

        try {
            const response = await service.update(id, name, corpusId);
            emitter.emit('newMessage',response)
            return res.json(response);
        }
        catch (e){
            return next(e);
        }
    }

    async delete(req, res, next){
        const {id} = req.params;

        try {
            return res.json(await service.delete(id));
        }
        catch (e){
            return next(e);
        }
    }
}

module.exports = new AudienceController();