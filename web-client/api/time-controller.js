import $api from './index'
import {domain} from "./index";

class TimeController{
    async getAll(){
        const url = domain+'/api/v1/times'
        return await $api.get(url);
    }
}

export default new TimeController()