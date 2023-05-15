const bcrypt = require('bcrypt')
class UserService{
    async hash(pwd){
        const pass = await bcrypt.hash(pwd, 3);
        console.log(pass);
        return pass;
    }
    async login(){

    }
}

module.exports = new UserService();