const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TeacherSubjectEntity = sequelize.define('TeacherSubject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, {timestamps: false});

module.exports = TeacherSubjectEntity;