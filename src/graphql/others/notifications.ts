//@ts-nocheck
const typedefs = `#graphql
    type Notification {
        id:ID!
        title:String!
        description:String!
        status:Int!
        sender:Account!
        receiver:Account
        createdAt:String!
    }
`
const notification_query = `#graphql
    getNotifications(id:String): [Notification]
`
const queries = {
    getNotifications: async (parent, args, context) => {
        console.log("Args:Outside", args);
        try {
            // const notificationService=await NotificationService.getNotifications(args);
            // return notificationService;
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