const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TypeOfPairEntity = sequelize.define('typeOfPair', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING(20), allowNull: false},
    color: {type: DataTypes.STRING(8), allowNull: false},
}, {timestamps: false});

module.exports = TypeOfPairEntity;