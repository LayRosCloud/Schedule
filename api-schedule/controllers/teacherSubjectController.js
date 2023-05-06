const db = require('../data/db')
const TeacherSubject = require('../models/teacherSubject')
class TeacherSubjectController{
    async getAll(req, res){
        const teachersSubjects = await db.query(process.env.QUERY_SELECT_TEACHERSUBJECT_ALL);
        const teacherSubjectsWithLinks = [];
        let index = 0;
        teachersSubjects.rows.forEach(element => {
           teacherSubjectsWithLinks[index++] = new TeacherSubject(element);
        });
        return res.json(teacherSubjectsWithLinks);
    }
    async getOne(req, res){
        const id = req.params.id;
        const teacherSubject = await db.query(process.env.QUERY_SELECT_TEACHERSUBJECT_ONE, [id]);
        const teacherSubjectWithLink = new TeacherSubject(teacherSubject.rows[0]);
        return res.json(teacherSubjectWithLink);
    }
}

module.exports = new TeacherSubjectController();