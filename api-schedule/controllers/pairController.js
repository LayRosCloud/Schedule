const db = require('../data/db')
class PairController{
    async getAll(req, res){
        const pairs = await db.query(process.env.QUERY_SELECT_PAIR_ALL);
        return res.json(pairs.rows);
    }
    async getOne(req, res){
        const id = req.params.id;
        const pair = await db.query(process.env.QUERY_SELECT_PAIR_ONE, [id]);
        return res.json(pair.rows[0]);
    }
}

module.exports = new PairController();