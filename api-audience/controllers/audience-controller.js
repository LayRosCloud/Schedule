const service = require('../services/audience-service');

class AudienceController{
    async create(req, res, next){
        const {name, corpusId} = req.body;

        try {
            const response = await service.create(name, corpusId);
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
        const {name, corpusId} = req.body;

        try {
            return res.json(await service.update(id, name, corpusId));
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