const EventSource = require("eventsource");
const TeacherService = require("../services/teacher-service");
const TeacherSubjectService = require("../services/teacher-subject-service");
const AudienceService = require("../services/audience-service");
const CorpusService = require("../services/corpus-service");

module.exports = async function (){

    const teacherSubjectEvent = new EventSource(`${process.env.API_URL_TEACHERS}/v1/teachersSubjects/connect`)
    teacherSubjectEvent.onmessage = async function (message) {
        if((JSON.parse(message.data)).length){
            await TeacherSubjectService.updateArray(message.data)
            return;
        }
        await TeacherSubjectService.createOrUpdate(message.data)
    };

    const teacherEvent = new EventSource(`${process.env.API_URL_TEACHERS}/v1/teachers/connect`)
    teacherEvent.onmessage = async function (message) {
        await TeacherService.createOrUpdate(message.data)
    };

    const audienceEvent = new EventSource(`${process.env.API_URL_AUDIENCE}/v1/audience/connect`)
    audienceEvent.onmessage = async function (message) {
        await AudienceService.createOrUpdate(message.data)
    };

    const corpusEvent = new EventSource(`${process.env.API_URL_AUDIENCE}/v1/corpus/connect`)
    corpusEvent.onmessage = async function (message) {
        await CorpusService.createOrUpdate(message.data)
    };
}