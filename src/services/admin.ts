//@ts-nocheck
import { db } from "../lib/db.config";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

class AdminService {
    public static createEvent(payload) {
        const { description, date, name, location } = payload
        console.log("Args:Inside CreateEvent", payload);
        const formattedDate = new Date(date).toISOString();

        return db.event.create({
            data: {
                description: description,
                date: formattedDate,
                name: name,
                location: location
            },
        })
    }
    public static async updateAgencyFormStatus(payload) {
        const { id, status } = payload
        console.log("Args:Inside UpdateAgencyFormStatus", id, status);
        const getForm = await db.agencyApplication.findUnique({
            where: {
                id: id
            }
        })
        if (!getForm) {
            throw new ApiError(404, "Form not found");
        }
        if (getForm.status === "APPROVED") {
            throw new ApiError(405, "Form already approved");
        }
        const update = await db.agencyApplication.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })
        console.log(update);
        if (update.status != "APPROVED") {
            return new ApiResponse(200, "Form Rejected", update)
        }

        const createAcc = await this.createAgencyAcccount(update)
        console.log(createAcc);
        if (!createAcc) {
            throw new ApiError(500, "Error creating account")
        }

        const agency = await this.setAgencyLoc({ account: createAcc.id, ...update })

        return new ApiResponse(202, "Agency Created", agency);

    }
    private static async createAgencyAcccount(payload) {
        console.log("Args:Inside CreateAgencyAccount", payload);
        return db.account.create({
            data: {
                email: payload.email,
                password: "agency",
                role: "AGENCY",
                name: payload.name,
                phone: payload.phone,
            }
        })
    }

    private static async setAgencyLoc(payload) {
        const { latitude, longitude, account, pincode, state, city } = payload
        console.log("Args:Inside SetAgencyLocation", payload);

        return db.location.create({
            data: {
                latitude: latitude,
                longitude: longitude,
                pincode: pincode,
                state: state,
                city: city,
                accountId: account
            },
        })
    }
    public static async getAgencyForms() {
        console.log("Args:Inside GetAgencyForm");
        return db.agencyApplication.findMany()
    }
    public static async getEvents() {
        console.log("Args:Inside GetEvents");
        return db.event.findMany()
    }
}
export default AdminService
