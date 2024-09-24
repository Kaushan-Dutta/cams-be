//@ts-nocheck
import EventService from "../../services/event";

const event_query = `#graphql
    getEvent(id:String!): Event
`
const queries={
        
        getEvent: async (parent,args,context) => {
            console.log("Args:Outside",args);
            try {
                const event = await EventService.getEvent(args);
                return event;
            }
            catch (err) {
                return err
            }
        }
}

export const Event = {
    queries: event_query,
    resolvers: {
        queries: queries,
    }
}