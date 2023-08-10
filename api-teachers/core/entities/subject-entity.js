const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const SubjectEntity = sequelize.define('Subject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

module.exports = SubjectEntity;