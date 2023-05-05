const Link = require('../models/link')

class LinkController{
    async getAll(req, res){
        const links = [
            new Link('links', process.env.MAIN_URI),
            new Link('dayOfWeeks', `${process.env.MAIN_VERSION}/day`),
        ]

        return res.json(links);
    }
}

module.exports = new LinkController();