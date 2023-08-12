import axios from 'axios'
import hashtable from './links'

export const domain = 'http://localhost:5000'

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