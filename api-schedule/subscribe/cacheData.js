const axios = require("axios");
const TeacherService = require('../services/teacher-service')
const TeachersSubjectsService = require('../services/teacher-subject-service')
const AudienceService = require('../services/audience-service')
const CorpusService = require('../services/Corpus-service')

module.exports = async function cacheData(){
    try{
        const teachers = await axios.get(`${process.env.API_URL_TEACHERS}/v1/teachers`)
        const teachersSubjects = await axios.get(`${process.env.API_URL_TEACHERS}/v1/teachersSubjects`)
        const audience = await axios.get(`${process.env.API_URL_AUDIENCE}/v1/audience`)
        const corpus = await axios.get(`${process.env.API_URL_AUDIENCE}/v1/corpus`)

        const dataTeachers = teachers.data
        const dataTeachersSubjects = teachersSubjects.data
        const dataAudience = audience.data
        const dataCorpus = corpus.data

        for (let i = 0; i < dataTeachers.length; i++) {
            await TeacherService.createOrUpdate(dataTeachers[i])
        }

        for (let i = 0; i < dataTeachersSubjects.length; i++) {
            await TeachersSubjectsService.createOrUpdate(dataTeachersSubjects[i])
        }
        for (let i = 0; i < dataAudience.length; i++) {
            await AudienceService.createOrUpdate(dataAudience[i])
        }

        for (let i = 0; i < dataCorpus.length; i++) {
            await CorpusService.createOrUpdate(dataCorpus[i])
        }
    }
    catch (e) {
        console.log(e)
        throw e
    }


}