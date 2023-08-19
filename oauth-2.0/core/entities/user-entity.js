const database = require('../database/index')
const {DataTypes} = require('sequelize')

const UserEntity = database.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    login: {type: DataTypes.STRING(30), unique: true, allowNull: false},
    password: {type: DataTypes.STRING(60), allowNull: false},
    accessToken: {type: DataTypes.STRING(1000), allowNull: false}
},{updatedAt: false})

module.exports = UserEntity