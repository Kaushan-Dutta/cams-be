import AdminService from "../../services/admin";
import NotificationService from "../../services/notification";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import Transaction from "../../managers/TransactionManager";
// import TransactionService from "../../services/transaction";
import AgencyService from "../../services/agency";
import { ApplicationForm } from "../../types/agency";

const queries = {
    getAgencyForms: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetAgencyForms", args);

        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError(401, "Unauthorized")
            }
            const forms = await AdminService.getAgencyForms();
            return new ApiResponse(200, "Agency Register Forms", forms);

        } catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
const mutations = {
    updateAgencyFormStatus: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside UpdateAgencyFormStatus", args);
        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError(401, "Unauthorized")

            }
            const getForm:ApplicationForm | null = await AdminService.ifFormExists(args);
            if (!getForm) {
                throw new ApiError(404, "Form not found");
            }
            if (getForm.status === "APPROVED") {
                throw new ApiError(405, "Form already approved");
            }
            const updateStatus:ApplicationForm | null=await AdminService.updateAgencyFormStatus(args);
            if(updateStatus.status!="APPROVED"){
                return new ApiResponse(200, "Form Rejected", updateStatus)
            }
            const createAcc = await AdminService.createAgencyAcccount(updateStatus)
            if (!createAcc) {
                throw new ApiError(500, "Error creating account")
            }

            return new ApiResponse(200, "Form Status Updated", updateStatus);

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    
}
export const resolvers = { queries, mutations }