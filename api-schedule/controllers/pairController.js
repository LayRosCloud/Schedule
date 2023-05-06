const db = require('../data/db')
const Pair = require('../models/pair')
const ApiError = require('../error/apiError')
class PairController{
    async getAll(req, res){
        const pairs = await db.query(process.env.QUERY_SELECT_PAIR_ALL);

        const pairsWithLinks = []
        let index = 0;
        pairs.rows.forEach(element => {
            pairsWithLinks[index++] = new Pair(element);
        })

        return res.json(pairsWithLinks);
    }
    async getOne(req, res){
        const id = req.params.id;
        const pair = await db.query(process.env.QUERY_SELECT_PAIR_ONE, [id]);
        const pairWithLink = new Pair(pair.rows[0]);
        return res.json(pairWithLink);
    }
    async post(req, res, next){
        const {dayofweekid,teachersubjectid,audienceid,datestart,numberweeks,groupid,typeofpairid,timeid} = req.body
        if(!dayofweekid || !teachersubjectid || !audienceid || !datestart || !numberweeks|| !groupid || !typeofpairid || !timeid){
            return next(ApiError.badRequest('Ошибка в теле запроса'));
        }
        const pair = await db.query(process.env.QUERY_INSERT_PAIR, [dayofweekid, teachersubjectid, audienceid, datestart,numberweeks, groupid, typeofpairid, timeid]);
        const pairWithLink = new Pair(pair.rows[0]);
        return res.json(pairWithLink);
    }
    async update(req, res, next){
        const {id,dayofweekid,teachersubjectid,audienceid,datestart,numberweeks,groupid,typeofpairid,timeid} = req.body
        if(!id || !dayofweekid || !teachersubjectid || !audienceid || !datestart || !numberweeks|| !groupid || !typeofpairid || !timeid){
            return next(ApiError.badRequest('Ошибка в теле запроса'));
        }
        const pair = await db.query(process.env.QUERY_UPDATE_PAIR, [dayofweekid, teachersubjectid, audienceid, datestart,numberweeks, groupid, typeofpairid, timeid, id]);
        const pairWithLink = new Pair(pair.rows[0]);
        return res.json(pairWithLink);
    }
}

module.exports = new PairController();