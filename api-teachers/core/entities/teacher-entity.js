const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TeacherEntity = sequelize.define('Teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(50), allowNull: false},
    LastName: {type: DataTypes.STRING(50), allowNull: false},
    Patronymic: {type: DataTypes.STRING(50), allowNull: false},
    Phone: {type: DataTypes.STRING(17), allowNull: true},
    DateFired: {type: DataTypes.DATE, allowNull: true},
    Image: {type: DataTypes.STRING(150), allowNull: true}
}, {timestamps: false});
module.exports = TeacherEntity;