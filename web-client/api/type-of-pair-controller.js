import $api from './index'
import {domain} from "./index";

class TypeOfPairController{
    async getAll(){
        const url = domain+'/api/v1/typeOfPairs'
        return await $api.get(url);
    }
}

export default new TypeOfPairController()