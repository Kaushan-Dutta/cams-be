//@ts-nocheck
import { db } from "../lib/db.config";
import { accountIdGenerator } from "../utils";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

class AdminService {
    
    public static async ifFormExists(payload) {
        console.log("Args:Inside IfFormExists", payload);
        return await db.agencyApplication.findUnique({
            where: {
                id: payload.id
            }
        })
    }
    public static async updateAgencyFormStatus(payload) {
        const { id, status } = payload
        console.log("Args:Inside UpdateAgencyFormStatus", id, status);
        
        
        return await db.agencyApplication.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })

        

        // const agency = await this.setAgencyLoc({ account: createAcc.id, ...update })

        // return new ApiResponse(202, "Agency Created", agency);

    }
    public static async createAgencyAcccount(payload) {
        console.log("Args:Inside CreateAgencyAccount", payload);
        return db.account.create({
            data: {
                id: accountIdGenerator(),
                password: "agency",
                role: "AGENCY",
                email: payload.email,
                phone: payload.phone,
                name: payload.name,
                locationId: payload.locationId,
            }
        })
    }

    private static async setAgencyLoc(payload) {
        // const { latitude, longitude, account, pincode, state, city } = payload
        console.log("Args:Inside SetAgencyLocation", payload);

        return db.location.create({
            data: {
                accountId: account,
                ...payload
            },
        })
    }
    public static async getAgencyForms() {
        console.log("Args:Inside GetAgencyForm");
        return db.agencyApplication.findMany({
            include:{
                location:true
            }
        })
    }
}
export default AdminService
