const Link = require('./link')
class Pair{
    constructor(element) {
        this.id = element.id;
        this.dayofweekid = element.dayofweekid;
        this.teachersubjectid = element.teachersubjectid;
        this.audienceid = element.audienceid;
        this.datestart = element.datestart;
        this.numberweeks = element.numberweeks;
        this.groupid = element.groupid;
        this.typeofpairid = element.typeofpairid;
        this.timeid = element.timeid;
        this.links = [];
        this.links[0] = new Link('dayOfWeek', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_DAY}${element.dayofweekid}`)
        this.links[1] = new Link('teachersubject', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TEACHERSUBJECT}${this.teachersubjectid}`)
        this.links[2] = new Link('audience', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_AUDIENCE}${this.audienceid}`)
        this.links[3] = new Link('group', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_GROUP}${this.groupid}`)
        this.links[4] = new Link('type', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TYPE}${this.typeofpairid}`)
        this.links[5] = new Link('time', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TIME}${this.timeid}`)

    }
}
module.exports = Pair;