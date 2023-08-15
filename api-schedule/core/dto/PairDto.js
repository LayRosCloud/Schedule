module.exports = class PairDto{
    constructor(object, teacherSubject, audience) {
        this.id = object.id
        this.dateStart = object.dateStart
        this.dateEnd = object.dateEnd
        this.audience = audience
        this.teacherSubject = teacherSubject
        this.dayOfWeek = object.dayOfWeek
        this.time = object.time
        this.typeOfPair = object.typeOfPair;
		this.group = object.group
    }

}