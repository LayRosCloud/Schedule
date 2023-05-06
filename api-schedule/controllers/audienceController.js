const db = require('../data/db')
const Audience = require('../models/audience')
class AudienceController{
    async getAll(req, res){
        const audiences = await db.query(process.env.QUERY_SELECT_AUDIENCE_ALL);
        const audiencesWithLinks = []
        let index = 0;
        audiences.rows.forEach(element =>{
            audiencesWithLinks[index++] = new Audience(element);
        })
        return res.json(audiencesWithLinks);
    }
    async getOne(req, res){
        const id = req.params.id;
        const audience = await db.query(process.env.QUERY_SELECT_AUDIENCE_ONE, [id]);
        const audienceWithLink = new Audience(audience.rows[0]);
        return res.json(audienceWithLink);
    }
}

module.exports = new AudienceController();

