const TeacherEntity = require('./entities/teacher-entity')
const StudyEntity = require('./entities/study-entity')
const TeacherSubjectEntity = require('./entities/teachersubject-entity')
const SubjectEntity = require('./entities/subject-entity')

StudyEntity.hasMany(TeacherEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: true}});
TeacherEntity.belongsTo(StudyEntity);

TeacherEntity.hasMany(TeacherSubjectEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
TeacherSubjectEntity.belongsTo(TeacherEntity)
SubjectEntity.hasMany(TeacherSubjectEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
TeacherSubjectEntity.belongsTo(SubjectEntity)

module.exports = {
    SubjectEntity,
    TeacherSubjectEntity,
    StudyEntity,
    TeacherEntity
}

