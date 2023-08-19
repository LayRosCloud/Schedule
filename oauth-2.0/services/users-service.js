const {UserEntity,RoleEntity,PermissionEntity} = require('../core/models')
const JwtService = require('./jwt-service')
const RoleService = require('./role-service')
const PermissionService = require('./permission-service')
const ClientService = require('./client-service')
const ApiException = require('../exceptions/api-exception')
const bcrypt = require('bcrypt')
const UserDto = require('../core/dto/UserDto')
const UserResponseDto = require('../core/dto/UserResponseDto')

const include = {
    attributes: ['roleId'],
    model: PermissionEntity,
    include: [RoleEntity]
}
class UsersService{
    async getByLogin(login){
        const user = await UserEntity.findOne({where: {login}, include})
        return user
    }

    async getById(id){
        const user = await UserEntity.findByPk(id, {include})
        return new UserResponseDto(user)
    }

    async verify(token){
        const user = await JwtService.get(token);

        if(!user){
            throw ApiException.badBody();
        }
        const response = JwtService.verify(token)
        if(!response){
            throw ApiException.badBody('Ошибка! Токен неправильный')
        }
        return response.permissions
    }

    async login(login, password, clientId, clientSecret){

        if(!login || !password || !clientId || !clientSecret){
            throw ApiException.badBody()
        }
        login = login.toLowerCase()

        const client = await ClientService.getById(clientId)
        if(!client && client.clientSecret !== clientSecret){
            throw ApiException.notFound('Ошибка! Такого клиента не существует!')
        }

        const user = await this.getByLogin(login)
        if(!user){
            throw ApiException.notFound('Ошибка! Неверный логин или пароль')
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if(isPasswordEquals === false){
            throw ApiException.notFound('Ошибка! Пароль')
        }
        const userDto = new UserDto(user)
        const accessToken = JwtService.create({...userDto});
        await UserEntity.update({login, password: user.password, accessToken}, {where: {id: user.id}})
        const lastUser = await this.getById(user.id);
        return lastUser
    }

    async create(login, password){
        if(!login || !password){
            throw ApiException.badBody()
        }
        login = login.toLowerCase();
        const user = await this.getByLogin(login)
        if(user){
            throw ApiException.badBody()
        }
        const hashPassword =  await bcrypt.hash(password, 3)

        const accessToken = JwtService.create({login})

        const newUser = await UserEntity.create({login, password: hashPassword, accessToken})

        const role = await RoleService.getByName('guest');
        await PermissionService.create(newUser.id, role.id)

        return this.getById(newUser.id)
    }

}

module.exports = new UsersService()