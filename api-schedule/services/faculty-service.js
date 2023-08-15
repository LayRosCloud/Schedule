const {FacultyEntity, CollegeEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

const attributes = ['id', 'name']
const include = [CollegeEntity]

class FacultyService {
    async getAll(){
        const response = await FacultyEntity.findAll({attributes,include});
        return response;
    }
    async getById(id){
        const response = await FacultyEntity.findOne({attributes, where: {id}, include})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }
    async create(name, collegeId){
        if(!name || !collegeId){
            throw ApiException.badBody()
        }

        return await FacultyEntity.create({name, collegeId})
    }
    async update(id, name, collegeId){
        if(!name || !collegeId){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await FacultyEntity.update({name, collegeId}, {where: {id}})
        return this.getById(id)
    }
    async delete(id){
        await this.getById(id)
        await FacultyEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new FacultyService()