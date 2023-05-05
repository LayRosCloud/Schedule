const db = require('../data/db')
class TimeController{
    async getAll(req, res){
        const times = await db.query(process.env.QUERY_SELECT_TIME_ALL);
        return res.json(times.rows);
    }
    async getOne(req, res){
        const id = req.params.id;
        const time = await db.query(process.env.QUERY_SELECT_TIME_ALL, [id]);
        return res.json(time.rows[0]);
    }
}

module.exports = new TimeController();