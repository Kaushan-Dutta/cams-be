import AgencyService from "../../services/agency";
import UserService from "../../services/user";
import redisclient from '../../lib/redis.config'
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import Transaction from "../../managers/TransactionManager";

const queries = {
    getUserCases: async (parent: any, args: any, context: any) => {
        console.log("Args: Outside of GetUserCases", args);
        try {
            if (context.user.role != "USER") {
                throw new ApiError(401, "Unauthorized", {}, false);

            }
            const caseKey = `cases:${context.user.id}`;
            console.log("Case Key:", caseKey);

            let cachedCases = await redisclient.get(caseKey);

            if (cachedCases) {
                console.log("Returning cached cases");
                return new ApiResponse(200, "User Cases from cached", JSON.parse(cachedCases));
            }

            const getCases = await UserService.getCases({ accounId: context.user.id });

            await redisclient.set(caseKey, JSON.stringify(getCases), { "EX": 600 });

            return new ApiResponse(200, "User Cases", getCases);

        } catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },

}
const mutations = {
    caseRegister: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside CaseRegister", args);
        try {
            if (context.user.role != "USER") {
                throw new ApiError(401, "Unauthorized", {}, false);
            }
            return await Transaction.startTransaction(async () => {

                const getAgencyFromPincode = await AgencyService.getAgencyFromPincode({ pincode: args.data.pincode });
                console.log("Agency", getAgencyFromPincode);

                if (!getAgencyFromPincode) {
                    throw new ApiError(404, "No Agency in this location", {});
                }
                const caseRegister = await UserService.caseRegister({ account: context.user.id, ...args.data });
                console.log("Case Register", caseRegister);

                if (!caseRegister) {
                    throw new ApiError(405, "Case Registration Failed", {});
                }
                const mapCaseAgency = await UserService.mapCaseAgency({ caseId: caseRegister.id, agencyId: getAgencyFromPincode.accountId });
                console.log(mapCaseAgency)

                if (!mapCaseAgency) {
                    throw new ApiError(405, "Case Registration Failed", {});
                }
                if (args.data.evidence) {
                    const updateCaseEvidence = await UserService.updateCaseEvidence({ account: caseRegister.id, evidence: args.data.evidence });
                    console.log(updateCaseEvidence);

                    return new ApiResponse(200, "Case Report sent to Agency", { caseRegister, mapCaseAgency, updateCaseEvidence })
                }
                return new ApiResponse(200, "Case Report sent to Agency", { caseRegister, mapCaseAgency })

            });

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },

    register: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside Register", args);
        try {
            const register = await UserService.userRegister(args);
            return new ApiResponse(202, "User Registered", register);

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const resolvers = { mutations, queries }