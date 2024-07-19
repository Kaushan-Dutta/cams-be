"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    static createUser(payload) {
        const { email, password } = payload;
        console.log(email, password);
        return { message: "User created successfully" };
    }
}
exports.default = UserService;
