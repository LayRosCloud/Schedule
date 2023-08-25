import $api from './index'
import {domain} from "./index";

class PairController{
    async getAll(groupId, teacherSubjectId, audienceId){

        const url = domain+'/api/v1/pairs'
        if(!groupId && !teacherSubjectId && !audienceId){
            return await $api.get(url, {params: {isCurrentDate: 1}})
        }

        return await $api.get(url,
            {
                params: {
                    isCurrentDate: 1,
                    groupId: groupId,
                    teacherSubjectId: teacherSubjectId,
                    audienceId: audienceId
                }
            })
    }
}

export default new PairController()