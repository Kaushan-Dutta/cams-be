import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import AlertService from "../../services/alert";

const alert_query = `#graphql
    getAlerts: Response
`
const alert_mutation = `#graphql
    postAlert(latitude:String,longitude:String): Response
    updateAlert(id:ID,status:String): Response,
`
const queries = {

    getAlerts: async (parent:any, args:any, context:any) => {
        console.log("Args:Outside for alerts", args);
        try {
            if(context.user.role != 'AGENCY') {
                throw new ApiError(401, "Unauthorized")
            }
            const alerts = await AlertService.getAlerts({ agencyId: context.user.id });
            return new ApiResponse(200, "Alerts Fetched", alerts);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
const mutations = {

    postAlert: async (parent:any, args:any, context:any) => {
        console.log("Args:Outside", args);
        try {
            const alert = await AlertService.postAlert(args);
            return new ApiResponse(201, "Alert Posted", alert)

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    updateAlert: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside UpdateAlert", args);
        try {
            const alert = await AlertService.updateAlert(args);

            return new ApiResponse(200, "Alert Updated", alert);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },

}
export const Alert = {
    queries: alert_query,
    mutations: alert_mutation,
    resolvers: {
        queries: queries,
        mutations: mutations
    }
}