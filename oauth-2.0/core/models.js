const ClientEntity = require('./entities/client-entity')
const PermissionEntity = require('./entities/permission-entity')
const RoleEntity = require('./entities/role-entity')
const UserEntity = require('./entities/user-entity')

RoleEntity.hasMany(PermissionEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PermissionEntity.belongsTo(RoleEntity);

UserEntity.hasMany(PermissionEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PermissionEntity.belongsTo(UserEntity);

UserEntity.hasMany(ClientEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
ClientEntity.belongsTo(UserEntity);

module.exports = {
    ClientEntity,
    PermissionEntity,
    RoleEntity,
    UserEntity
}