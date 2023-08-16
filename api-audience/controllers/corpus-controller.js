const service = require('../services/corpus-service');
const saveImage = require('../scripts/save-image')

const events = require("events");
const emitter = new events.EventEmitter

class CorpusController{
    async create(req, res, next){
        const {name, streetId, numberOfHome} = req.body;

        try {
            let path = null;

            if (req.files && req.files.image){
                const {image} = req.files;
                path = await saveImage(image);
            }

            const response = await service.create(name, streetId, path, numberOfHome);
            emitter.emit('newMessage',response)
            return res.json(response);
        }
        catch (e){
            return next(e);
        }
    }

    async connect(request, res){
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
        })
        emitter.on('newMessage',  (message) => {
            res.write(`data: ${JSON.stringify(message)} \n\n`)
        })
    }

    async getAll(req, res){
        return res.json(await service.getAll());
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
        const {name, streetId, numberOfHome} = req.body;
        let {path} = req.body

        try {
            if (req.files && req.files.image){
                const {image} = req.files;
                path = await saveImage(image);
            }
            const response = await service.update(id, name, path, streetId, numberOfHome);
            emitter.emit('newMessage', response)
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

module.exports = new CorpusController();