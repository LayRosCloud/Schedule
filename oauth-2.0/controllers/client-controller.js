const ClientService = require('../services/client-service')

class ClientController{

    async getById(req, res, next){
        const {id} = req.params
        try{
            const client = await ClientService.getById(id)
            return res.json(client)
        }catch (e){
            next(e)
        }
    }
    async create(req, res,next){
        const {userId} = req.body
        try{
            const client = await ClientService.create(userId)
            return res.json(client)
        }catch (e){
            return next(e)
        }
    }

    async delete(req, res, next){
        const {id, userId} = req.params
        try{
            const client = await ClientService.delete(id, userId)
            return res.json(client)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new ClientController()