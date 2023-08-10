const sequelize = require("../dataBase");
const {DataTypes} = require("sequelize");

const AudienceEntity = sequelize.define('audience', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

module.exports = AudienceEntity;