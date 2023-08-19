const PermissionService = require('../services/permission-service')

class PermissionController{
    async create(req, res, next){
        const {userId, roleId} = req.body
        try{
            const client = await PermissionService.create(userId, roleId)
            return res.json(client)
        }catch (e){
            return next(e)
        }
    }
    async delete(req, res, next){
        const {id} = req.params
        try{
            const client = await PermissionService.delete(id)
            return res.json(client)
        }catch (e){
            return next(e)
        }
    }
}

module.exports = new PermissionController()