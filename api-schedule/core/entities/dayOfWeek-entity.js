const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const DayOfWeekEntity = sequelize.define('dayOfWeeks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING(20), allowNull: false},
}, {timestamps: false});

module.exports = DayOfWeekEntity;