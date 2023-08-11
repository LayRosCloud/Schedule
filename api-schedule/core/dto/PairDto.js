module.exports = class PairDto{
    constructor(object, teacher, audience) {
        this.id = object.id
        this.numberOfWeeks = object.numberOfWeeks
        this.dateStart = object.dateStart
        this.audienceId = object.audienceId
        //this.teacherId = object.teacherId
        //this.dayOfWeekId = object.dayOfWeekId
        //this.timeId = object.timeId
        //this.groupId = object.groupId
        //this.typeOfPairId = object.typeOfPairId
        //this.audienceId = object.audienceId
        this.audience = audience || null
        this.teacher = teacher || null
        this.dayOfWeek = object.dayOfWeek
        this.time = object.time
        this.typeOfPair = object.typeOfPair;
    }

}