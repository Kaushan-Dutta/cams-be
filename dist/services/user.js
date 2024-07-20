"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
class UserService {
    static userRegister(payload) {
        const { email, password } = payload;
        console.log(email, password);
        return { message: "User Register success" };
    }
}
exports.default = UserService;
