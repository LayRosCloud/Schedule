const Link = require('./link')
class Group{
    constructor(id, name, cafedraid, course) {
        this.id = id;
        this.name = name;
        this.cafedraid = cafedraid;
        this.course =course;
        this.links = [];
        this.links[0] = new Link('cafedra', `${process.env.MAIN_VERSION}/cafedra/${cafedraid}`)
    }

}

module.exports = Group;