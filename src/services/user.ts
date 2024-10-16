//@ts-nocheck
import { db } from "../lib/db.config";
import redisclient from '../lib/redis.config'

class UserService {
    public static userRegister(payload) {
        console.log("Args:Inside UserRegister", payload);
        const { email, password } = payload
        return db.account.create({
            data: {
                email: email,
                password: password,
            },
        })
    }
    public static async caseRegister(payload) {
        console.log("Args:Inside CaseRegister", payload);
        const { type, name, phone, pincode, document, account } = payload
        return db.caseApplication.create({
            data: {
                type: type,
                name: name,
                phone: phone,
                pincode: pincode,
                document: document,
                accountId: account,

            }
        })
    }
    public static async mapCaseAgency(payload) {
        console.log("Args:Inside MapCaseAgency", payload);
        const { caseId, agencyId } = payload
        
        return db.caseAgencyMap.create({
            data: {
                agencyId: agencyId,
                caseId: caseId,
            }
        })
        

        
    }
    public static async updateCaseEvidence(payload) {
        console.log("Args:Inside UpdateCaseEvidence", payload);
        const { account, evidence } = payload
        for (let i = 0; i < evidence.length; i++) {
            await db.evidence.create({
                data: {
                    caseId: account,
                    ...evidence[i],
                }
            })
        }
        return true
    }

    public static getCases(payload) {
        console.log("Args:Inside the getCases", payload);
        
        return db.caseApplication.findMany({
            where: {
                accountId:payload.accounId
            }
        })
    }

}
export default UserService