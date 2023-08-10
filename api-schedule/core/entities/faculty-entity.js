const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const FacultyEntity = sequelize.define('faculty', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING(50), allowNull: false},
}, {timestamps: false});

module.exports = FacultyEntity;