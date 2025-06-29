//@ts-nocheck
import { db } from '../lib/db.config'
import redisclient from '../lib/redis.config'

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET 

class AccountService {
    public static async accountLogin(payload) {
        const { email, password } = payload
        console.log("Args:Inside AccountLogin", payload);
        const account = await db.account.findUnique({
            where: {
                email: email,
            }
        })

        if (!account) {
            throw new Error("Account not found")
        }
        if (account.password === password) {
            return this.generateJWT({ id: account.id, email: account.email, role: account.role })
        }
        throw new Error("Invalid Credentials")

    }
    public static decodeJWT(payload) {
        const { token } = payload
        console.log(token);
        return jwt.verify(token, JWT_SECRET)
    }
    private static generateJWT(payload) {
        const { id, email, role } = payload
        console.log(JWT_SECRET,payload)
        return jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: '5d' })
    }
    public static updateAccount(payload) {
        const { id } = payload
        console.log("Args:Inside UpdateAccount", payload);
        return db.account.update({
            where: {
                id: id
            },
            data: {
                ...payload
            }
        })

    }
    public static async getAccount(payload) {
        const { id } = payload
        console.log("Args:Inside GetAccount", payload);
        const account = await db.account.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
            }
        })
        if (!account) {
            throw new Error("Account not found")
        }
        return account
    }
    // public static getPublicId(payload){
    //     const { id } = payload
    //     console.log("Args:Inside GetPublicId", payload);
    //     return db.account.findUnique({
    //         where: {
    //             id: id
    //         },
    //         select:{
    //             publicId:true
    //         }
    //     })
    // }

}
export default AccountService