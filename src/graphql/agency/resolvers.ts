import AgencyService from "../../services/agency";
import NotificationService from "../../services/notification";
import { ResolverProps } from "../../types";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import Transaction from "../../managers/TransactionManager";
import { send } from "process";
// import TransactionService from "../../services/transaction";
import Locationservice from "../../services/location";
import CaseService from "../../services/case";
import FileUploadService from "../../services/fileUpload";

const queries = {
    getAgencyCases: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetAgencyCases");
        try {
            console.log("Context",context.user.role);   
            const cases = await AgencyService.getAgencyCases({ agencyId: context.user.id });

            // const casesData = cases.map((item) => {
            //     return item.case
            // })
            console.log("Cases", cases);
            return new ApiResponse(200, "Agency Cases", cases);
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

            const casesFile = cases.map((item: any) => {
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
            const lat = Math.round(args.data.latitude * 1000) / 1000;
            const long = Math.round(args.data.longitude * 1000) / 1000;

            const location = await Locationservice.addLocationDetails(lat, long);
            if (!location) {
                throw new ApiError(404, "Location not regsiterded", {}, false);
            }
            const file = await FileUploadService.uploadFile(args.data.document);
            if (!file) {
                throw new ApiError(404, "File not regsiterded", {}, false);
            }
            args.data.document = file;
            const {latitude,longitude,...agencyInput}=args.data; 
            const register = await AgencyService.agencyRegister({ locationId: location.id, ...agencyInput });
            return new ApiResponse(201, "Agency Registered", register);
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
            const update = await AgencyService.updateCaseStatus(args);

            // const blockTransaction = await TransactionService.createCase({ agencyId: context.user.id, caseId: args.id, userId: update.accountId });
            // console.log("Block Transaction", blockTransaction);
            const complainerId = await CaseService.getComplainerId({ caseId: args.id });
            await NotificationService.createNotification({
                messageType: args.status == "APPROVED" ? 'CASE_ACCEPT' : 'CASE_REJECT', data: {
                    name: update.title,
                    agency_name: check_case_agency.agency.name
                }, type: "PERSONAL", receiverId: complainerId
            });
            return new ApiResponse(200, "Case Updated", update);

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    sendCaseReq: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside SendCaseReq", args);
        try {
            if (context.user.role != "AGENCY") {
                throw new ApiError(401, 'Unauthorized');
            }
            const sendCase = await AgencyService.sendCaseReq(args);
            return new ApiResponse(200, "Request Sent");
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }

}
export const resolvers = { queries, mutations }
// (caseId:String!,requestMessage:String!): Response,
