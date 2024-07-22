//@ts-nocheck
import {db} from '../lib/db.config'

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

class AccountService{
    public static async accountLogin(payload){
        const {email,password} = payload
        console.log("Args:Inside",payload);
        const account=await db.account.findUnique({
            where:{
                email:email,
            }
        })

        if(!account){
            throw new Error("Account not found")
        }
        if(account.password===password){
            return this.generateJWT({id:account.id,email:account.email,role:account.role})
        }
        throw new Error("Invalid Credentials")

    }
    public static decodeJWT(payload){
        const {token} = payload
        console.log(token);
        return jwt.verify(token,JWT_SECRET)
    }
    private static generateJWT(payload){
        const {id,email,role} = payload
        return jwt.sign({id,email,role},JWT_SECRET,{expiresIn:'1d'})
    }

}
export default AccountService