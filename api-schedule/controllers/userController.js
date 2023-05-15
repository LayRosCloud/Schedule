const userService = require('../service/user-service');
const {json} = require("express");

class UserController{
    async login(req, res, next){

    }
    async reg(req, res, next){
        const {password} = req.body
        const pwdHash = await userService.hash(password);
        return res.json({password: pwdHash});
    }
    async auth(req, res, next){
        
    }
    async refresh(req, res, next){

    }
    async logout(req, res, next){

    }
}

module.exports = new UserController();