import $api from './index'
import {domain} from "./index";

class GroupController{
    async getAll(){
        const url = domain+'/api/v1/groups'
        return await $api.get(url);
    }
    async get(id){
        const url = domain+`/api/v1/groups/${id}`
        return await $api.get(url);
    }
}

export default new GroupController()