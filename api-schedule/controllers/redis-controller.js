const serviceSubject = require('../services/teacher-subject-service')
const serviceTeacher = require('../services/teacher-service')
const serviceAudience = require('../services/audience-service')
const serviceCorpus = require('../services/corpus-service')

class RedisController{
    async getAll(req, res){
        return res.json(await serviceSubject.getAll())
    }
    async getAllTeachers(req, res){
        return res.json(await serviceTeacher.getAll())
    }
    async getAllAudiences(req, res){
        return res.json(await serviceAudience.getAll())
    }
    async getAllCorpus(req, res){
        return res.json(await serviceCorpus.getAll())
    }

}

module.exports = new RedisController()