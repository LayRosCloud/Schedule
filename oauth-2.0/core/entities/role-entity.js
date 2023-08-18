const database = require('../database/index')
const {DataTypes} = require('sequelize')

const RoleEntity = database.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING(30), unique: true, allowNull: false},
},{timestamps: false})

module.exports = RoleEntity