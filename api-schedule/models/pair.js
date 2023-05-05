class Pair{
    constructor(id, dayofweekid, teachersubjectid, audienceid, datestart, numberweeks, groupid, typeofpairid, timeid) {
        this.id = id;
        this.dayofweekid = dayofweekid;
        this.teachersubjectid = teachersubjectid;
        this.audienceid = audienceid;
        this.datestart = datestart;
        this.numberweeks = numberweeks;
        this.groupid = groupid;
        this.typeofpairid = typeofpairid;
        this.timeid = timeid;
        this.links = [];
        this.links[0] = new Link('dayOfWeek', `${process.env.MAIN_VERSION}/day/${dayofweekid}`)
        this.links[1] = new Link('teachersubject', `${process.env.MAIN_VERSION}/teachersubject/${teachersubjectid}`)
    }
}