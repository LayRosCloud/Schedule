const db = require('../data/db');
const Group = require('../models/group')
class GroupController{
    async getAll(req, res){
        const groups = await db.query(process.env.QUERY_SELECT_GROUP_ALL);
        const groupsWithLinks = [];
        let index = 0;
        groups.rows.forEach(element => {
            groupsWithLinks[index++] = new Group(element.id, element.name, element.cafedraid, element.course);
        });
        return res.json(groupsWithLinks);
    }
    async getOne(req, res){
        const id = req.params.id;
        const group = await db.query(process.env.QUERY_SELECT_GROUP_ONE, [id]);
        const groupWithLink = new Group(group.rows[0].id,group.rows[0].name,group.rows[0].cafedraid,group.rows[0].course)
        return res.json(groupWithLink);
    }
}

module.exports = new GroupController();