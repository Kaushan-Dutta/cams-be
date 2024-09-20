export const typedefs = `#graphql
    type Agency {
        name: String!
        email: String!
        pincode: String!
        phone: String!
        document: String!
        latitude: String!
        longitude: String!
        state: String!
        city: String!
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
    input CaseFilterType  {
        accountId: String
        status: CaseStatus
        agencyId: String
        userId: String
        createdAt: String
        type: CaseType
    },
    type Evidence {
        id: String!
        url: String
        file: String
        description: String!
        caseId:String!
    },
    input EvidenceInput {
        url: String
        file: String
        description: String!
    }
    enum CaseType {
        CYBER
        MISSING
        KIDNAPPING
        TRAFFICKING
        ACCIDENT
        OTHER
    },
    enum CaseStatus {
        PENDING
        APPROVED
        REJECTED
    },
    
    type Case {
        id:String!
        type: CaseType!
        name: String!
        phone: String!
        pincode: String!
        evidence: Evidence
        document: String
        status: CaseStatus
        account: Account
        accountId: String
        createdAt: String
        agency: Agency
        agencyId: String
    }

`



