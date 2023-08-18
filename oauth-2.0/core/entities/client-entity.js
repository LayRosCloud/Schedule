const database = require('../database/index')
const {DataTypes} = require('sequelize')

const ClientEntity = database.define('client', {
    clientId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    clientSecret: {type: DataTypes.STRING(100), unique: true, allowNull: false}
},{timestamps: false})

module.exports = ClientEntity