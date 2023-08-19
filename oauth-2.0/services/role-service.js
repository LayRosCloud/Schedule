const {RoleEntity} = require('../core/models')
class RoleService{
    async getAll(){
        const roles = await RoleEntity.findAll();
        return roles
    }
    async getById(id){
        const role = await RoleEntity.findByPk(id);
        return role
    }
    async getByName(name){
        const role = await RoleEntity.findOne({where: {name}});
        return role
    }
}

module.exports = new RoleService()