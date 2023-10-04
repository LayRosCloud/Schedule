import axios from 'axios'

export const domain = 'http://188.225.77.116:5000'
export const domainTeacher = 'http://188.225.77.116:5002'
export const domainAudience = 'http://188.225.77.116:5001'
const $api = axios.create({
    withCredentials: true,
})


export default $api;