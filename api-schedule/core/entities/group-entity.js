const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const GroupEntity = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING(10), allowNull: false},
}, {timestamps: false});

module.exports = GroupEntity;