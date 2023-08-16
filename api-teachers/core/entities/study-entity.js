const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const StudyEntity = sequelize.define('Study', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(200), unique: true, allowNull: false},
}, {timestamps: false});

module.exports = StudyEntity;