import axios from 'axios'
import hashtable from './links'

export const domain = 'http://185.250.44.61:5000'
export const domainTeacher = 'http://185.250.44.61:5002'
export const domainAudience = 'http://185.250.44.61:5001'
const $api = axios.create({
    withCredentials: true,
})

export function start(){
    const hrefPoint = domain + '/api/'
    axios.get(hrefPoint).then(links => {
        links.data.map(link => {
            hashtable.add(link.rel, `${domain}${link.href}`)
        })
    })
}

export default $api;