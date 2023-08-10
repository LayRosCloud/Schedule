const {CourseEntity, FacultyEntity} = require('../core/models')
const ApiException = require('../exceptions/ApiException')

class CourseService {
    async getAll(){
        const response = await CourseEntity.findAll({include: [FacultyEntity]});
        return response;
    }
    async getById(id){
        const response = await CourseEntity.findOne({where: {id}, include: [FacultyEntity]})
        if(!response){
            throw ApiException.notFound('Ошибка! Объект не найден')
        }
        return response;
    }
    async create(name, facultyId){
        if(!name || !facultyId){
            throw ApiException.badBody()
        }

        return await CourseEntity.create({name, facultyId})
    }
    async update(id, name, facultyId){
        if(!name || !facultyId){
            throw ApiException.badBody()
        }

        await this.getById(id)
        await CourseEntity.update({name, facultyId}, {where: {id}})
        return this.getById(id)
    }
    async delete(id){
        await this.getById(id)
        await CourseEntity.destroy({where: {id}})
        return {status: 200, message: `Объект с ${id} успешно удален!`}
    }
}

module.exports = new CourseService()