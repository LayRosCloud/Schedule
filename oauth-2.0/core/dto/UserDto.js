class UserDto{
    constructor(object) {
        this.id = object.id
        this.login = object.login;
        this.dateRegistration = object.createdAt
        this.permissions = object.permissions
    }
}

module.exports = UserDto