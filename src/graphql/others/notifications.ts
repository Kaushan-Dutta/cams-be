//@ts-nocheck
import NotificationService from "../../services/notification";

const typedefs = `#graphql
    type Notification {
        id:ID!
        message:String!
        createdAt:String!
    }
`
const notification_query = `#graphql
    getNotifications: [Notification]
`
const queries = {
    getNotifications: async (parent, args, context) => {
        console.log("Args:Outside", args);
        try {
            const notification=await  NotificationService.getNotifications({id:context.id});  
            console.log("Notification",notification);
            return notification;          
        }
        catch (err) {
            return err
        }
    }
}
export const Notification = {
    typedefs: typedefs,
    queries: notification_query,
    resolvers: {
        queries: queries
    }
}