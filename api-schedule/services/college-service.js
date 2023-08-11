const {CollegeEntity, FacultyEntity, CourseEntity, GroupEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

class CollegeService {
    async getAll(){
        const response = await CollegeEntity.findAll({
            include:[
                {model: FacultyEntity,
                include: [{
                    model: CourseEntity,
                    include:[{
                        model: GroupEntity,
                    }]
                }]
                }
            ]
        });
        return response;
    }
    async getById(id){
        const response = await CollegeEntity.findOne({where: {id},include:[
                {model: FacultyEntity,
                    include: [{
                        model: CourseEntity,
                        include:[{
                            model: GroupEntity,
                        }]
                    }]
                }
            ]})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }
    async create(shortName, fullName){
        if(!shortName || !fullName){
            throw ApiException.badBody()
        }

        return await CollegeEntity.create({shortName, fullName})
    }
    async update(id, shortName, fullName){
        if(!shortName || !fullName){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await CollegeEntity.update({shortName, fullName}, {where: {id}})
        return this.getById(id)
    }
    async delete(id){
        await this.getById(id)
        await CollegeEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new CollegeService()