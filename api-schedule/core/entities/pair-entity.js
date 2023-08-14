const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const PairEntity = sequelize.define('pair', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    dateStart: {type: DataTypes.DATEONLY, allowNull: false},
    dateEnd: {type: DataTypes.DATEONLY, allowNull: false},
    audienceId: {type: DataTypes.INTEGER, allowNull: false},
    teacherSubjectId: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: false});

module.exports = PairEntity;