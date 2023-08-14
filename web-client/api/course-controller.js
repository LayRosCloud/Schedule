import $api from './index'
import {domain} from "./index";

class CourseController{
    async getAll(){

        const url = domain+'/api/v1/courses'
        return await $api.get(url);
    }
    async get(id){

        const url = domain+`/api/v1/courses/${id}`
        return await $api.get(url);
    }
}

export default new CourseController()