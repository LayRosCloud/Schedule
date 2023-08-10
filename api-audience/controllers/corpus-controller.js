const service = require('../services/corpus-service');
const saveImage = require('../scripts/save-image')

class CorpusController{
    async create(req, res, next){
        const {name, streetId} = req.body;

        try {
            let path = null;

            if (req.files && req.files.image){
                const {image} = req.files;
                path = await saveImage(image);
            }

            const response = await service.create(name, streetId, path);
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
        const {name, streetId} = req.body;
        let {path} = req.body

        try {
            if (req.files && req.files.image){
                const {image} = req.files;
                path = await saveImage(image);
            }
            return res.json(await service.update(id, name, path, streetId));
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