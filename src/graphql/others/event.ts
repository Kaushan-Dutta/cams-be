import EventService from "../../services/event";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";
import { ResolverProps } from "../../types";
import NotificationService from "../../services/notification";
import AdminService from "../../services/admin";
import Transaction from "../../managers/TransactionManager";
import redisclient from '../../lib/redis.config'
import Locationservice from "../../services/location";
import FileUploadService from "../../services/fileUpload";

const event_query = `#graphql
    getEvent(id:String!): Response,
    getEvents:Response

`
const event_mutation = `#graphql
    createEvent(data:EventInput):Response,
`
const queries = {

    getEvent: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside", args);
        try {
            const event = await EventService.getEvent(args);
            return new ApiResponse(200, "Event fetched", event);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },

    getEvents: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetEvents", args);
        try {
            // const caseKey = `events:${context.user.id}`;
            // console.log("Case Key:", caseKey);

            // let cachedEvent = await redisclient.get(caseKey);
            // if (cachedEvent) {
            //     return new ApiResponse(200, "Events from cached", JSON.parse(cachedEvent));
            // }
            const events = await EventService.getEvents();
            // await redisclient.set(caseKey, JSON.stringify(events), { "EX": 600 });

            return new ApiResponse(200, "Events", events);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
const mutations = {
    createEvent: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside CreateEvent", args);
        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError(401, "Unauthorized")
            }
            const lat = Math.round(args.data.latitude * 1000) / 1000;
            const long = Math.round(args.data.longitude * 1000) / 1000;
            
            const location = await Locationservice.addLocationDetails(lat, long);
            if (!location) {
                throw new ApiError(404, "Location not regsiterded", {}, false);
            }
            // console.log("Banner",args.data.banner);

            if(args.data.banner){ 
                // console.log("Banner",args.data.banner);
                args.data.banner = await FileUploadService.uploadFile(args.data.banner);
            }
            
            const {latitude,longitude,...eventInput} = args.data;
            const event = await EventService.createEvent({locationId: location.id, ...eventInput});
            if(!event){
                throw new ApiError(404, "Event Not Created", {}, false);
            }
            const notification = await NotificationService.createNotification({ messageType: "EVENT", data: args.data, type: "BROADCAST" });
            if (!notification) {
                throw new ApiError(404, "Notification not Broadcasted", {}, false);

            }
            return new ApiResponse(200, "Event Created", event);
        }

        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const Event = {
    queries: event_query,
    mutations: event_mutation,
    resolvers: {
        queries: queries,
        mutations: mutations
    }
}