const ApiError = require('../error/api-error')
class HateoasService{
    getAll(){
        const links = [{rel: 'links', href: '/api/'}]
        addLink(process.env.URL_CITY)
        addLink(process.env.URL_REGION)
        addLink(process.env.URL_STREET)
        addLink(process.env.URL_CORPUS)
        addLink(process.env.URL_AUDIENCE)
        addLink(process.env.URL_AUDIENCE_LOCKED)

        function addLink(rel, version=process.env.URL_VERSION){
            links.push(
                {
                    rel: rel.replace('/', '-'),
                    href: `${process.env.URL_START_POINT}${version}${rel}/`
                }
            )
        }
        return links
    }

    getByRel(rel){
        let response = null
        this.getAll().map(link => {

            if(link.rel === rel){
                response = link
            }

        })

        if(response){
            return response
        }

        throw ApiError.badRequest('Ошибка! Такой ссылки не существует!')
    }
}

module.exports = new HateoasService()