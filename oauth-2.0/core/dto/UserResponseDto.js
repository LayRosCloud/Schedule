const UserDto = require("./UserDto");

class UserResponseDto extends UserDto{
    constructor(object) {
        super(object)
        this.accessToken = object.accessToken
    }
}

module.exports = UserResponseDto