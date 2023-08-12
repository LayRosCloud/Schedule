
export default class LinkTable{
    static #links = []
    static add(key, href){
        this.#links[key] = href
    }
    static get(key){
        return this.#links[key]
    }
}