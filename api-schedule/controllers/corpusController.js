const db = require('../data/db')
class CorpusController{
    async getAll(req, res){
        const dayOfWeeks = await db.query(process.env.QUERY_SELECT_CORPUS_ALL);
        return res.json(dayOfWeeks.rows);
    }
    async getOne(req, res){
        const id = req.params.id;
        const dayOfWeekJSON = await db.query(process.env.QUERY_SELECT_CORPUS_ONE, [id]);
        return res.json(dayOfWeekJSON.rows[0]);
    }
}

module.exports = new CorpusController();