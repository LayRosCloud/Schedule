const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TeacherEntity = sequelize.define('Teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    LastName: {type: DataTypes.STRING, allowNull: false},
    Patronymic: {type: DataTypes.STRING, allowNull: false},
    Phone: {type: DataTypes.STRING, allowNull: true},
    DateFired: {type: DataTypes.DATE, allowNull: true},
    Image: {type: DataTypes.STRING, allowNull: true}
});
module.exports = TeacherEntity;