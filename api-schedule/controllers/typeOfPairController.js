const db = require('../data/db')
class TypeOfPairController{
    async getAll(req, res){
        const typesOfPair = await db.query(process.env.QUERY_SELECT_TYPEOFPAIR_ALL);
        return res.json(typesOfPair.rows);
    }
    async getOne(req, res){
        const id = req.params.id;
        const typeOfPair = await db.query(process.env.QUERY_SELECT_TYPEOFPAIR_ONE, [id]);
        return res.json(typeOfPair.rows[0]);
    }
}

module.exports = new TypeOfPairController();