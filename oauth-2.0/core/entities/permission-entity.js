const database = require('../database/index')
const {DataTypes} = require('sequelize')

const RoleEntity = database.define('permission', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
},{timestamps: false})

module.exports = RoleEntity