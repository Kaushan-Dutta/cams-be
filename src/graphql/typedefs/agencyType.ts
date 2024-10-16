export const typedefs=`#graphql
    enum ApplicationStatus {
        PENDING
        APPROVED
        REJECTED
    },
    type AgencyApplications {
        id: String!
        name: String!
        pincode: String!
        document: String!
        status: ApplicationStatus!
        phone: String!
        latitude: String!
        longitude: String!
    },
    type Agency {
        id: String
        name: String
        email: String
        pincode: String
        phone: String
        document: String
        latitude: String
        longitude: String
        state: String
        city: String
    },
    input AgencyApplyForm {
        name: String!
        email: String!
        pincode: String!
        phone: String!
        document: String!
        latitude: Float!
        longitude: Float!
        state: String!
        city: String!
    },
    
`