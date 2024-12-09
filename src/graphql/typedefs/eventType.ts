export const typedefs=`#graphql
    input EventInput {
        name: String!
        description: String!
        date: String!
        startTime: String!
        endTime: String!
        venue: String!
        latitude: String!
        longitude: String!
        banner: String
        contact: String!
    },
    # type Event {
    #     id:String!
    #     name: String!
    #     description: String!
    #     date: String!
    #     location: String!
    #     startTime: String!
    #     endTime: String!
    # }
`