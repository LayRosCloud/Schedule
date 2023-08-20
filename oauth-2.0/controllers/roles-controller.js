const RoleService = require('../services/role-service')

class RoleController{
    async getAll(req, res){
        const roles = await RoleService.getAll();
        return res.json(roles)
    }

    async getById(req, res, next){
        const {id} = req.params
        try{
            const roles = await RoleService.getById(id);
            return res.json(roles)
        }catch (e){
            next(e)
        }

    }

}

module.exports = new RoleController()