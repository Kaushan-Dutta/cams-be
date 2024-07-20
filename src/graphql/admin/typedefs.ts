export const typedefs=`#graphql
   
    input EventInput {
        title: String!
        description: String!
        date: String!
        time: String!
        location: String!
    },
    type AgencyApply {
        name: String!
        email: String!
        pincode: String!
        phone: String!
        document: String!
        latitude: String!
        longitude: String!
    },
`