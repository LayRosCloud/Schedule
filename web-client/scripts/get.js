import pairController from "../api/pair-controller";
import typeOfPairController from "../api/type-of-pair-controller";
import timeController from "../api/time-controller";
import dayOfWeekController from "../api/dayOfWeek-controller";
import courseController from "../api/course-controller";
import collegeController from "../api/college-controller";
const cache = new Map();

const cachedKeys = {
    days: 'days',
    fullTime: 'fullTimes',
    typeOfPair: 'typeOfPairs'
}

export async function getPairs(groupId, teacherId, audienceId){
    const responsePairs = await pairController.getAll(groupId, teacherId, audienceId);
    return responsePairs.data
}

export async function getTypeOfPairs(){
    let typeOfPairs = []

    if(cache.get(cachedKeys.typeOfPair)){
        typeOfPairs = cache.get(cachedKeys.typeOfPair);
    }else{
        typeOfPairs = (await typeOfPairController.getAll()).data
        cache.set(cachedKeys.typeOfPair, typeOfPairs)
    }

    return typeOfPairs
}

export async function getFullTimes(){
    let fullTimes = []

    if(cache.get(cachedKeys.fullTime)){
        fullTimes = cache.get(cachedKeys.fullTime);
    }else{
        const responseTime = await timeController.getAll()
        fullTimes = responseTime.data;
        cache.set(cachedKeys.fullTime, fullTimes)
    }
    return fullTimes
}

export async function getDays(){
    let days = []
    if(cache.get(cachedKeys.days)){
        days = cache.get(cachedKeys.days);
    }else{
        const responseTime = await dayOfWeekController.getAll()
        days = responseTime.data;
        cache.set(cachedKeys.days, days)
    }

    return days;
}

export function getShortTimes(pairs, fullTimes){

    let min = 20;
    let max = 0;

    for (let i = 0; i < pairs.length; i++) {
        const timeId = pairs[i].time.id
        if(min > timeId){
            min = timeId
        }
        if(max < timeId){
            max = timeId
        }
    }

    const resultTimes = [];
    for (let i = 0; i < fullTimes.length; i++) {
        if(fullTimes[i].id >= min && fullTimes[i].id <= max)
            resultTimes.push(fullTimes[i])
    }
    return resultTimes
}

export async function getCollege(group){
    const responseCourse = await courseController.get(group.courseId)
    const responseCollege = await collegeController.get(responseCourse.data.faculty.collegeId);
    return responseCollege.data
}
