const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const CourseEntity = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.SMALLINT, allowNull: false},
}, {timestamps: false});

module.exports = CourseEntity;