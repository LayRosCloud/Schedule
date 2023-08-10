const sequelize = require("../dataBase");
const {DataTypes} = require("sequelize");

const StreetEntity = sequelize.define('street', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

module.exports = StreetEntity;