const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const SubjectEntity = sequelize.define('Subject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FullName: {type:DataTypes.STRING(60), allowNull: false},
    Name: {type: DataTypes.STRING(10), allowNull: true},
}, {timestamps: false});

module.exports = SubjectEntity;