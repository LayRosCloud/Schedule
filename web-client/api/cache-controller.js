import $api from './index'
import {domain} from "./index";

class CacheController{
    async getAllTeachers(){
        const url = domain+'/api/v1/cache/teachers'
        return await $api.get(url);
    }
    async getByIdTeacher(id){
        const url = domain+`/api/v1/cache/teachers/${id}`
        return await $api.get(url);
    }

    async getAllAudiences(){
        const url = domain+'/api/v1/cache/audiences'
        return await $api.get(url);
    }
    async getByIdAudience(id){
        const url = domain+`/api/v1/cache/audiences/${id}`
        return await $api.get(url);
    }
}

export default new CacheController()