export const typedefs=`#graphql
    type Alert {
        id: String!
        latitude: Float!
        longitude: Float!
        status:ApplicationStatus!
        agencyId:String,
        createdAt:String
}`