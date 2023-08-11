const service = require('../services/audienceLocked-service');


class AudienceLockedController{
    async create(req, res, next){
        const {dateStart, dateEnd, audienceId} = req.body;

        try {
            const response = await service.create(dateStart, dateEnd, audienceId);

            return res.json(response);
        }
        catch (e){
            return next(e);
        }
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
        const {dateStart, dateEnd, audienceId} = req.body;

        try {
            const response = await service.update(id, dateStart, dateEnd, audienceId);
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

module.exports = new AudienceLockedController();