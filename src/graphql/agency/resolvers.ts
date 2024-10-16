import AgencyService from "../../services/agency";
import NotificationService from "../../services/notification";
import { ResolverProps } from "../../types";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import Transaction from "../../managers/TransactionManager";

const queries = {
    getAgencyCases: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetAgencyCases");
        try {
            // console.log("Context",context.user.role);   
            const cases = await AgencyService.getAgencyCases({ agencyId: context.user.id });
            const casesData = cases.map((item) => {
                return item.case
            })
            console.log("Cases", casesData);
            return new ApiResponse(200, "Agency Cases", casesData);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    getAllCases: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside for getAllCases");
        try {
            if (context.user.role != 'AGENCY') {
                throw new ApiError(401, 'Unauthorized');
            }
            const cases = await AgencyService.getAllCases();
            // console.log("All files", cases)

            const casesFile = cases.map((item) => {
                return {
                    ...item.case,
                    agency: item.agency
                }
            })
            // console.log("All files", casesFile)
            return new ApiResponse(200, "All Registered Cases", casesFile);
        }



        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
const mutations = {
    agencyRegister: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside AgencyRegister", args);
        try {
            const register = await AgencyService.agencyRegister(args.data);
            return new ApiResponse(201, "Agency Registered", register);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    updateAlert: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside UpdateAlert", args);
        try {
            const alert = await AgencyService.updateAlert(args);

            return new ApiResponse(200, "Alert Updated", alert);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },

    updateCaseStatus: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside UpdateCaseStatus", args);
        try {
            const check_case_agency = await AgencyService.getAgencyCaseMap({ agencyId: context.user.id, caseId: args.id });
            console.log("Check Case Agency", check_case_agency);

            if (!check_case_agency) {
                return new ApiError(404, "No case in your control")
            }
            return await Transaction.startTransaction(async () => {
                const update = await AgencyService.updateCaseStatus(args);
                await NotificationService.createNotification({
                    messageType: args.status == "APPROVED" ? 'CASE_ACCEPT' : 'CASE_REJECT', data: {
                        name: update.name,
                        agency_name: check_case_agency.agency.name
                    }, type: "PERSONAL", receiverId: update.accountId
                });
                return new ApiResponse(200, "Case Updated", update);
            })

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const resolvers = { queries, mutations }