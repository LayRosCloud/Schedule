const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TeacherSubjectEntity = sequelize.define('TeacherSubject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

module.exports = TeacherSubjectEntity;