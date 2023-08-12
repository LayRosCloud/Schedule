import $api from './index'
import {domain} from "./index";

class CollegeController{
    async getAll(){
        const url = domain+'/api/v1/colleges'
        return await $api.get(url)
    }
}

export default new CollegeController()