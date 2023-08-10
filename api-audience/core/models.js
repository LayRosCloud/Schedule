const AudienceEntity = require('./entities/audience-entity');
const AudienceLockedEntity = require('./entities/audienceLocked-entity');
const CityEntity = require('./entities/city-entity');
const CorpusEntity = require('./entities/corpus-entity');
const RegionEntity = require('./entities/region-entity');
const StreetEntity = require('./entities/street-entity');

CorpusEntity.hasMany(AudienceEntity,{onDelete: 'CASCADE', foreignKey: {allowNull: false}});
AudienceEntity.belongsTo(CorpusEntity);

AudienceEntity.hasMany(AudienceLockedEntity,{onDelete: 'CASCADE', foreignKey: {allowNull: false}})
AudienceLockedEntity.belongsTo(AudienceEntity);

StreetEntity.hasMany(CorpusEntity,{onDelete: 'CASCADE', foreignKey: {allowNull: false}})
CorpusEntity.belongsTo(StreetEntity);

CityEntity.hasMany(StreetEntity,{onDelete: 'CASCADE', foreignKey: {allowNull: false}})
StreetEntity.belongsTo(CityEntity);

RegionEntity.hasMany(CityEntity,{onDelete: 'CASCADE', foreignKey: {allowNull: false}})
CityEntity.belongsTo(RegionEntity);

module.exports = {
    AudienceEntity,
    AudienceLockedEntity,
    CityEntity,
    CorpusEntity,
    RegionEntity,
    StreetEntity
}