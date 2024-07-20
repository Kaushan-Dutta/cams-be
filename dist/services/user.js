"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    static userRegister(email, password) {
        console.log(email, password);
        return { message: "User Register success" };
    }
}
exports.default = UserService;
