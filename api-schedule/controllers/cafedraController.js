const db = require('../data/db')
class CafedraController{
    async getAll(req, res){
        const dayOfWeeks = await db.query(process.env.QUERY_SELECT_CAFEDRA_ALL);
        return res.json(dayOfWeeks.rows);
    }
    async getOne(req, res){
        const id = req.params.id;
        const dayOfWeekJSON = await db.query(process.env.QUERY_SELECT_CAFEDRA_ONE, [id]);
        return res.json(dayOfWeekJSON.rows[0]);
    }
}

module.exports = new CafedraController();