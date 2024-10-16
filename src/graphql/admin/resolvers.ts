import AdminService from "../../services/admin";
import NotificationService from "../../services/notification";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import Transaction from "../../managers/TransactionManager";
import redisclient from '../../lib/redis.config'

const queries = {
    getAgencyForms: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetAgencyForms", args);

        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError(401, "Unauthorized")
            }
            const forms = await AdminService.getAgencyForms();
            return new ApiResponse(200, "Agency Register Forms", forms);

        } catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    getEvents: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetEvents", args);
        try {
            let cachedEvent = await redisclient.get("events");
            if (cachedEvent) {
                return new ApiResponse(200, "Events from cached", JSON.parse(cachedEvent));
            }
            const events = await AdminService.getEvents();
            await redisclient.set("events", JSON.stringify(events),{"EX": 600});

            return new ApiResponse(200, "Events", events);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
const mutations = {
    updateAgencyFormStatus: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside UpdateAgencyFormStatus", args);
        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError(401, "Unauthorized")

            }

            return await Transaction.startTransaction(async () => {
                return await AdminService.updateAgencyFormStatus(args);
            })

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    createEvent: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside CreateEvent", args);
        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError(401, "Unauthorized")
            }
            return await Transaction.startTransaction(async () => {
                const event = await AdminService.createEvent(args.data);
                const notification = await NotificationService.createNotification({ messageType: "EVENT", data: args.data, type: "BROADCAST" });
                if (notification) {
                    return new ApiResponse(201, "Event Created", { event, notification });
                }
                else {
                    throw new ApiError(404, "Event Not Found", {}, false);
                }
            })
        }


        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const resolvers = { queries, mutations }