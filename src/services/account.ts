
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

class AccountService{
    public static async accountLogin(email:string, password:string){
        console.log(email,password);
        return {message:"Account login successful",data:''}
    }
    public static async decodeJWT(token:string){
        console.log(token);
        return jwt.verify(token,JWT_SECRET)
    }
    public static async generateJWT(email:string,role:string){
        return jwt.sign({email,role},JWT_SECRET,{expiresIn:'1h'})
    }
}
export default AccountService