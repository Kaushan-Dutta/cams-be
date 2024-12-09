import AgencyService from "../../services/agency";
import UserService from "../../services/user";
import redisclient from '../../lib/redis.config'
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import Transaction from "../../managers/TransactionManager";
// import TransactionService from "../../services/transaction";

const queries = {
    getUserCases: async (parent: any, args: any, context: any) => {
        console.log("Args: Outside of GetUserCases", args);
        try {
            if (context.user.role != "USER") {
                throw new ApiError(401, "Unauthorized", {}, false);

            }
            // const caseKey = `cases:${context.user.id}`;
            // console.log("Case Key:", caseKey);

            // let cachedCases = await redisclient.get(caseKey);

            // if (cachedCases) {
            //     console.log("Returning cached cases");
            //     return new ApiResponse(200, "User Cases from cached", JSON.parse(cachedCases));
            // }

            const getCases = await UserService.getCases({ accounId: context.user.id });

            // await redisclient.set(caseKey, JSON.stringify(getCases), { "EX": 600 });

            return new ApiResponse(200, "User Cases", getCases);

        } catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },

}
const mutations = {
    

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