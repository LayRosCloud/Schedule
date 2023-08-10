const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TimeEntity = sequelize.define('time', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING(12), allowNull: false},
}, {timestamps: false});

module.exports = TimeEntity;