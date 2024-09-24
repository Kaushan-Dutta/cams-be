//@ts-nocheck
import AgencyService from "../../services/agency";
import NotificationService from "../../services/notification";
// id: String
//         accountId: String
//         status: CaseStatus
//         agencyId: String
//         userId: String
//         createdAt: String
//         type: CaseType
const queries = {
    getAgencyCases: async (parent, args, context) => {
        console.log("Args:Outside ");
        try {
            // console.log("Context",context.role);   
            const cases = await AgencyService.getAgencyCases({ agencyId: context.id });
            const casesData = cases.map((item) => {
                return item.case
            })
            // console.log("Cases",cases);
            return casesData;
        }
        catch (err) {
            return { message: err.message }
        }
    },
    getAllCases: async (parent, args, context) => {
        console.log("Args:Outside for get all cases");
        try {
            const cases=await AgencyService.getAllCases();  
            console.log("Cases",cases);
            const casesFile=cases.map((item)=>{
                return {
                    ...item.case,
                    agency:item.agency
                }
            }) 
            console.log("Cases",casesFile);
            return casesFile; 
        }
        catch (err) {
            return { message: err.message }
        }
    },
    alerts: async (parent, args, context) => {
        return { message: "Alerts fetched" }
    }
}
const mutations = {
    agencyRegister: async (parent, args, context) => {
        console.log("Args:Outside", args);
        try {
            const register = await AgencyService.agencyRegister(args.data);
            if (register) {
                return { message: "Agency Registered" }
            }
        }
        catch (err) {
            return { message: err.message }
        }
    },
    updateAlert: async (parent, args, context) => {
        console.log("Args:outside", args);
        try {
            const update = await AgencyService.updateAlert(args);
            if (update) {
                return { message: "Alert Updated" }
            }
            return { message: "Alert not updated" }
        }
        catch (err) {
            return { message: err.message }
        }
    },

    updateCaseStatus: async (parent, args, context) => {
        console.log("Args:outside", args);
        try {
            const check_case_agency = await AgencyService.getAgencyCaseMap({ agencyId: context.id, caseId: args.id });
            console.log("Check Case Agency", check_case_agency);

            if (!check_case_agency) {
                return { message: "Case not assigned to Agency" }
            }
            const update = await AgencyService.updateCaseStatus(args);
            if (update) {
                const notification = await NotificationService.createNotification({
                    messageType: args.status == "APPROVED" ? 'CASE_ACCEPT' : 'CASE_REJECT', data: {
                        name: update.name,
                        agency_name: check_case_agency.agency.name
                    }, type: "PERSONAL", receiverId: update.accountId
                });
                return { message: "Case Status Updated" }
            }
            return { message: "Case Status not updated" }
        }
        catch (err) {
            console.log("Error", err.message);
            throw new Error(err.message)
        }
    }
}
export const resolvers = { queries, mutations }