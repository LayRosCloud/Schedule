const sequelize = require("../dataBase");
const {DataTypes} = require("sequelize");

const RegionEntity = sequelize.define('region', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

module.exports = RegionEntity;