const Link = require('./link')
class Audience{
    constructor(element) {
        this.id = element.id;
        this.name = element.name;
        this.isclose = element.isclose;
        this.corpusid =element.corpusid;
        this.links = [];
        this.links[0] = new Link('corpus', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_CORPUS}${element.corpusid}`)
    }

}

module.exports = Audience;