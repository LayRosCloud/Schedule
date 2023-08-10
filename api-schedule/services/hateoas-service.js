const ApiException = require('../exceptions/ApiException')
class HateoasService{
    getAll(){
        const links = [{rel: 'links', href: '/api/'}]
        addLink(process.env.URL_AUDIENCES)
        addLink(process.env.URL_CORPUSES)
        addLink(process.env.URL_COLLEGES)
        addLink(process.env.URL_COURSES)
        addLink(process.env.URL_DAYOFWEEKS)
        addLink(process.env.URL_FACULTYS)
        addLink(process.env.URL_GROUPS)
        addLink(process.env.URL_PAIRS)
        addLink(process.env.URL_TEACHERS)
        addLink(process.env.URL_TEACHERS_SUBJECTS)
        addLink(process.env.URL_TIMES)
        addLink(process.env.URL_TYPE_OF_PAIRS)

        function addLink(rel, version=process.env.URL_VERSION){
            links.push(
                {
                    rel: rel.replace('/', '-'),
                    href: `${process.env.URL_START}${version}${rel}/`
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

        throw ApiException.notFound('Ошибка! Такой ссылки не существует!')
    }
}

module.exports = new HateoasService()