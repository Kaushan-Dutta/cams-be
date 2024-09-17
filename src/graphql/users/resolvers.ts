
//@ts-nocheck
import AgencyService from "../../services/agency";
import UserService from "../../services/user";
const queries = {
    getUserCases: async (parent, args, context) => {
        console.log("Args:Outside",args);
        try {
            if (context.role === "USER") {
                let filter = {};

                if (args.accountId) filter.accountId = context.id;
                if (args.status) filter.status = args.status;
                if (args.type) filter.type = args.type;
                if (args.createdAt) filter.createdAt = args.createdAt

                return await UserService.getCases(filter);
            }
            else {
                throw new Error("Unauthorized")
            }
        }
        catch (err) {
            return { message: err.message }
        }
    },
}
const mutations = {
    caseRegister: async (parent, args, context) => {
        console.log("Args:Outside", args, context);
        if (context.role === "USER") {
            try {
                const getAgencyFromPincode = await AgencyService.getAgencyFromPincode({ pincode: args.data.pincode });
                console.log("Agency", getAgencyFromPincode);
                if (getAgencyFromPincode) {
                    const caseRegister = await UserService.caseRegister({ account: context.id, ...args.data });
                    console.log("Case Register", caseRegister);

                    if (caseRegister) {
                        // console.log("Args evidence",args.data.evidence);
                        const mapCaseAgency = await UserService.mapCaseAgency({ caseId: caseRegister.id, agencyId: getAgencyFromPincode.accountId });
                        if (mapCaseAgency) {
                            console.log("Case Registered and Agency Mapped");
                        }
                        if (args.data.evidence) {
                            // console.log(args.evidence);
                            const updateCaseEvidence = await UserService.updateCaseEvidence({ account: caseRegister.id, evidence: args.data.evidence });
                            if (updateCaseEvidence) {
                                return { message: "Case Registered and Evidence Updated" }
                            }

                        }
                        return { message: "Case Registered" }
                    }
                }
                return { message: "Agency not found" }
            }
            catch (err) {
                return { message: err.message }
            }
        }
        else {
            throw new Error("Unauthorized")
        }
    },
    
    register: async (parent, args, context) => {
        console.log("Args:Outside", args);
        try {
            const accountService = await UserService.userRegister(args);
            if (accountService) {
                return { message: "User Registered" }
            }
        }
        catch (err) {
            return { message: err.message }
        }
    }
}
export const resolvers = { mutations,queries }