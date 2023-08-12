module.exports = class PairDto{
    constructor(object, teacherSubject, audience) {
        this.id = object.id
        this.numberOfWeeks = object.numberOfWeeks
        this.dateStart = object.dateStart
        this.audienceId = object.audienceId
        this.audience = audience || null
        this.teacherSubject = teacherSubject || null
        this.dayOfWeek = object.dayOfWeek
        this.time = object.time
        this.typeOfPair = object.typeOfPair;
		this.group = object.group
    }

}