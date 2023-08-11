const sequelize = require("../dataBase");
const {DataTypes} = require("sequelize");

const CityEntity = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
},{timestamps: false});

module.exports = CityEntity;