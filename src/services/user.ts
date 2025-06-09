//@ts-nocheck
import { db } from "../lib/db.config";
import redisclient from '../lib/redis.config'
import { caseIdGenerator,accountIdGenerator } from "../utils";

class UserService {
    public static userRegister(payload) {
        console.log("Args:Inside UserRegister", payload);
        const { email, password } = payload
        return db.account.create({
            data: {
                id: accountIdGenerator(),
                email: email,
                password: password,
                name:email.split('@')[0],
            },
        })
    }
   

    public static getCases(payload) {
        console.log("Args:Inside the getCases", payload);

        return db.caseParticipant.findMany({
            where: {
                type:'COMPLAINANT',
                accountId: payload.accounId
            },
            select: {
                case:{
                    
                    select:{
                        id:true,
                        type:true,
                        createdAt:true,
                        title:true,
                        status:true,
                        reporter:true,
                        location:{
                            select:{
                                pincode:true,
                                state:true,
                                country:true,
                                district:true
                            }
                        }
                    }
                }
            }
        })
    }

}
export default UserService