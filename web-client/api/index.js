import axios from 'axios'

export const domain = 'http://185.250.44.61:5000'
export const domainTeacher = 'http://185.250.44.61:5002'
export const domainAudience = 'http://185.250.44.61:5001'
const $api = axios.create({
    withCredentials: true,
})


export default $api;