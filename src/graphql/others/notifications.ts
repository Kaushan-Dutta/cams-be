import NotificationService from "../../services/notification";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";
import { ResolverProps } from "../../types";

const notification_query = `#graphql
    getNotifications: Response
`
const queries = {
    getNotifications: async (parent:any, args:any, context:any) => {
        console.log("Args:Outside", args);
        try {
            const notification=await  NotificationService.getNotifications({id:context.id});  
            return new ApiResponse(200,"Notificatiosn Fetched",notification);        
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const Notification = {
    queries: notification_query,
    resolvers: {
        queries: queries
    }
}