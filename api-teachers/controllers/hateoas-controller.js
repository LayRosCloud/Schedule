const service = require('../Services/hateoas-service')
class HateoasController{
    getAll(req, res){
        return res.json(service.getAll())
    }
    getByRel(req, res, next){
        const {rel} = req.params;
        try{
            return res.json(service.getByRel(rel))
        }catch (e){
            return next(e)
        }
    }
}

module.exports = new HateoasController()