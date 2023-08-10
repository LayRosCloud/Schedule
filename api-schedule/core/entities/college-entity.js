const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const CollegeEntity = sequelize.define('college', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    shortName: {type: DataTypes.STRING(20), allowNull: false},
    fullName: {type: DataTypes.STRING(255), allowNull: false},
}, {timestamps: false});

module.exports = CollegeEntity;