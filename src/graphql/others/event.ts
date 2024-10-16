import EventService from "../../services/event";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";
import { ResolverProps } from "../../types";

const event_query = `#graphql
    getEvent(id:String!): Response
`
const queries={
        
        getEvent: async (parent:any, args:any, context:any) => {
            console.log("Args:Outside",args);
            try {
                const event = await EventService.getEvent(args);
                return new ApiResponse(200,"Event fetched",event);
            }
            catch (err: any) {
                throw new ApiError(500, err.message, {}, false);
            }
        }
}

export const Event = {
    queries: event_query,
    resolvers: {
        queries: queries,
    }
}