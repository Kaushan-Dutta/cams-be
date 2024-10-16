export const typedefs = `#graphql
    input CaseFormInput {
        type: CaseType!
        name: String!
        phone: String!
        pincode: String!
        evidence: [EvidenceInput]
        document: String
        
    },
    input CaseFilterType  {
        accountId: String
        status: CaseStatus
        agencyId: String
        userId: String
        createdAt: String
        type: CaseType
    },
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
        evidence: [Evidence]
        document: String
        status: CaseStatus
        account: Account
        createdAt: String
        agency: Agency
    },
    type Evidence {
        id: String
        url: String
        file: String
        description: String
        caseId:String
    },
    input EvidenceInput {
        id: String
        url: String
        file: String
        description: String!
        caseId:String
    }
`