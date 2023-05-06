const db = require('../data/db')
class TeacherController{
    async getAll(req, res){
        const audiences = await db.query(process.env.QUERY_SELECT_TEACHER_ALL);
        return res.json(audiences.rows);
    }
    async getOne(req, res){
        const id = req.params.id;
        const audience = await db.query(process.env.QUERY_SELECT_TEACHER_ONE, [id]);
        return res.json(audience.rows[0]);
    }
}

module.exports = new TeacherController();