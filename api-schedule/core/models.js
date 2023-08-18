
const DayOfWeekEntity = require('./entities/dayOfWeek-entity')
const TimeEntity = require('./entities/time-entity')

const PairEntity = require('./entities/pair-entity')
const TypeOfPairEntity = require('./entities/typeOfPair-entity')

const CollegeEntity = require('./entities/college-entity')
const GroupEntity = require('./entities/group-entity')
const CourseEntity = require('./entities/course-entity')
const FacultyEntity = require('./entities/faculty-entity')




GroupEntity.hasMany(PairEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PairEntity.belongsTo(GroupEntity)

TimeEntity.hasMany(PairEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PairEntity.belongsTo(TimeEntity)

DayOfWeekEntity.hasMany(PairEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PairEntity.belongsTo(DayOfWeekEntity)

TypeOfPairEntity.hasMany(PairEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PairEntity.belongsTo(TypeOfPairEntity)

FacultyEntity.hasMany(CourseEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
CourseEntity.belongsTo(FacultyEntity)

CollegeEntity.hasMany(FacultyEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
FacultyEntity.belongsTo(CollegeEntity)

CourseEntity.hasMany(GroupEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
GroupEntity.belongsTo(CourseEntity)

module.exports = {
    PairEntity,
    TypeOfPairEntity,

    DayOfWeekEntity,
    TimeEntity,

    CourseEntity,
    FacultyEntity,
    GroupEntity,
    CollegeEntity
}