//@ts-nocheck
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

class AccountService{
    public static async accountLogin(payload){
        const {email,password} = payload
        console.log(email,password);
        return {message:"Account login successful",data:''}
    }
    public static async decodeJWT(payload){
        const {token} = payload
        console.log(token);
        return jwt.verify(token,JWT_SECRET)
    }
    public static async generateJWT(payload){
        const {email,role} = payload
        return jwt.sign({email,role},JWT_SECRET,{expiresIn:'1h'})
    }
}
export default AccountService