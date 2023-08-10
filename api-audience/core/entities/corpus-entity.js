const sequelize = require("../dataBase");
const {DataTypes} = require("sequelize");

const CorpusEntity = sequelize.define('corpus', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: true}
});

module.exports = CorpusEntity;
