const {PermissionEntity,RoleEntity} = require('../core/models')
const ApiException = require('../exceptions/api-exception')
class PermissionService{
    async getAllByUserId(userId){
        const permissions = await PermissionEntity.findAll({where: {userId}, include: [RoleEntity]})
        return permissions
    }
    async getById(id){
        const permission = await PermissionEntity.findOne({where: {id}})
        if(!permission){
            throw ApiException.badBody()
        }
        return permission
    }

    async create(userId, roleId){
        const permission = await PermissionEntity.create({userId, roleId})
        return permission;
    }

    async delete(id){
        await this.getById(id)
        await PermissionEntity.destroy({where: {id}})
        return {status: 200, message: 'Запись удалена'}
    }
}

module.exports = new PermissionService()