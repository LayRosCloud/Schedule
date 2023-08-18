const axios = require("axios");
const CacheDto = require('../core/dto/CacheDto')

const TeacherService = require('../services/teacher-service')
const TeachersSubjectsService = require('../services/teacher-subject-service')
const AudienceService = require('../services/audience-service')
const CorpusService = require('../services/corpus-service')

module.exports = async function cacheData(){
    try{
        const teacher = new CacheDto(`${process.env.API_URL_TEACHERS}/v1/teachers`, TeacherService)
		const teacherSubject = new CacheDto(`${process.env.API_URL_TEACHERS}/v1/teachersSubjects`, TeachersSubjectsService)
		await cacheService(teacher, teacherSubject)
    } catch (e) {
        console.log(e.message)
    }

    try{
        const audience = new CacheDto(`${process.env.API_URL_AUDIENCE}/v1/audience`, AudienceService)
		const corpus = new CacheDto(`${process.env.API_URL_AUDIENCE}/v1/corpus`, CorpusService)
		await cacheService(audience, corpus)
    } catch (e){
        console.log(e.message)
    }
}

async function cacheService(cacheDto1, cacheDto2){
    const dataService = await axios.get(cacheDto1.link)
    const dataServiceTwo = await axios.get(cacheDto2.link)

    await save(cacheDto1.service, dataService.data)
    await save(cacheDto2.service, dataServiceTwo.data)

    async function save(service, data){
        for (let i = 0; i < data.length; i++) {
            await service.createOrUpdate(data[i])
        }
    }
}