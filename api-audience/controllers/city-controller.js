const service = require('../services/city-service');

class CityController{
    async create(req, res, next){
        const {name, regionId} = req.body;

        try {
            const response = await service.create(name, regionId);
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
        const {name, regionId} = req.body

        try {
            return res.json(await service.update(id, name, regionId));
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

module.exports = new CityController();