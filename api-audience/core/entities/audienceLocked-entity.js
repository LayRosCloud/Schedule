const sequelize = require("../dataBase");
const {DataTypes} = require("sequelize");

const AudienceLockedEntity = sequelize.define('audienceLocked', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    dateStart: {type: DataTypes.DATE, allowNull: false},
    dateEnd: {type: DataTypes.DATE, allowNull: false},
},{timestamps: false});

module.exports = AudienceLockedEntity;