const service = require('../services/street-service');

class StreetController{
    async create(req, res, next){
        const {name, cityId} = req.body;

        try {
            const response = await service.create(name, cityId);
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
        const {name, cityId} = req.body;

        try {
            return res.json(await service.update(id, name, cityId));
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

module.exports = new StreetController();