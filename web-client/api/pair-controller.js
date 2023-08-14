import $api from './index'
import {domain} from "./index";

class PairController{
    async getAll(groupId, teacherSubjectId, audienceId){

        const url = domain+'/api/v1/pairs'
        if(!groupId && !teacherSubjectId && !audienceId){
            return await $api.get(url)
        }
        return await $api.get(url,
            {
                params: {
                    groupId: groupId,
                    teacherSubjectId: teacherSubjectId,
                    audienceId: audienceId,
                    isCurrentDate: 1
                }
            })
    }
}

export default new PairController()