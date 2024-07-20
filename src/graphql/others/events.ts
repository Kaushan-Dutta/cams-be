//@ts-nocheck
const typedefs=`#graphql
    type Event {
        id: ID!
        title: String!
        description: String!
        date: String!
        time: String!
        location: String!
    },
    
`
const event_query = `#graphql
    getEvents: [Event]
`
const queries={
        
        getEvents: async (parent,args,context) => {
            console.log("Args:Outside",args);
            try {
                // const events = await EventService.getEvents(args);
                // return events;
            }
            catch (err) {
                return err
            }
        }
}

export const Event = {
    typedefs: typedefs,
    queries: event_query,
    resolvers: {
        queries: queries,
    }
}