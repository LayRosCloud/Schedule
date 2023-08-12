import $api from './index'
import {domain} from "./index";

class DayOfWeekController{
    async getAll(){
        const url = domain+'/api/v1/dayOfWeeks'
        return await $api.get(url);
    }
}

export default new DayOfWeekController()