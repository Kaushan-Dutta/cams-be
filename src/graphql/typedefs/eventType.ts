export const typedefs=`#graphql
    input EventInput {
        name: String!
        description: String!
        date: String!
        location: String!
        startTime: String!
        endTime: String!
    },
    type Event {
        id:String!
        name: String!
        description: String!
        date: String!
        location: String!
        startTime: String!
        endTime: String!
    }
`