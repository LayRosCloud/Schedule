const Link = require('./link')
class TeacherSubject{
    constructor(element) {
        this.id = element.id;
        this.subject = element.subject;
        this.teacherid = element.teacherid;
        this.links = [];
        this.links[0] = new Link('cafedra', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TEACHER}${element.teacherid}`)
    }

}

module.exports = TeacherSubject;