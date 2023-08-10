const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const PairEntity = sequelize.define('pair', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    dateStart: {type: DataTypes.DATE, allowNull: false},
    numberOfWeeks: {type: DataTypes.SMALLINT, allowNull: false},
    audienceId: {type: DataTypes.INTEGER, allowNull: false},
    teacherId: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: false});

module.exports = PairEntity;