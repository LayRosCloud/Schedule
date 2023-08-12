import $api from './index'
import {domain} from "./index";

class PairController{
    async getAll(groupId, teacherSubjectId, ){
        const url = domain+'/api/v1/pairs'
        return await $api.get(url,
            {
                params: {
                    groupId: groupId,
                }
            })
    }
}

export default new PairController()