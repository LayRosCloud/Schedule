const db = require('../data/db')
class DayOfWeekController{
    async getAll(req, res){
        const dayOfWeeks = await db.query(process.env.QUERY_SELECT_DAYOFWEEK_ALL);
        return res.json(dayOfWeeks.rows);
    }
    async getOne(req, res){
        const id = req.params.id;
        const dayOfWeekJSON = await db.query(process.env.QUERY_SELECT_DAYOFWEEK_ONE, [id]);
        return res.json(dayOfWeekJSON.rows[0]);
    }
}

module.exports = new DayOfWeekController();