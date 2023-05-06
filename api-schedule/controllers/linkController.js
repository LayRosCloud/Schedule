const Link = require('../models/link')

class LinkController{
    async getAll(req, res){
        const links = [
            new Link('links', process.env.MAIN_URI),
            new Link('dayOfWeek', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_DAY}`),
            new Link('pair', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_PAIR}`),
            new Link('group', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_GROUP}`),
            new Link('cafedra', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_CAFEDRA}`),
            new Link('corpus', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_CORPUS}`),
            new Link('type', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TYPE}`),
            new Link('time', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TIME}`),
            new Link('teacher', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TEACHER}`),
            new Link('teachersubject', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_TEACHERSUBJECT}`),
            new Link('audience', `${process.env.MAIN_URI}${process.env.MAIN_VERSION}${process.env.URI_AUDIENCE}`),
        ]

        return res.json(links);
    }
}

module.exports = new LinkController();