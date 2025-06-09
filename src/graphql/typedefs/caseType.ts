export const typedefs = `#graphql
    input CaseFormInput {
        type: CaseType!
        title: String!
        description: String!
        dateOfIncident: String!
        latitude:String!
        longitude:String!
        evidence: [EvidenceInput]
        participant: [CaseParticipantInput]                
    },
    input EvidenceInput {
        id: String
        url: String
        content:String
        description: String
        caseId:String
    },
    input CaseParticipantInput {
        type:CaseParticipantType
        name: String
        phone: String
        address: String
        caseId:String
        details: String
        accountId: String
    }
    input CaseFilterType  {
        accountId: String
        status: CaseStatus
        agencyId: String
        userId: String
        createdAt: String
        type: CaseType
    }, 
    enum CaseType {
        CRIMINAL
        CIVIL
        TRAFFIC
        CYBER
        ECONOMIC
        FAMILY
        ENVIORMENTAL
        HEALTH
        INTELLECTUAL
        MISSING
        KIDNAPPING
        TRAFFICKING
        OTHER
    },
    enum CaseStatus {
        PENDING
        APPROVED
        REJECTED
    },
    enum CaseParticipantType {
        WITNESS
        SUSPECT
        COMPLAINANT
        ACCUSED
        OTHER
    },
    # type Case {
    #     id:String!
    #     type: CaseType!
    #     name: String!
    #     phone: String!
    #     pincode: String!
    #     evidence: [Evidence]
    #     document: String
    #     status: CaseStatus
    #     account: Account
    #     createdAt: String
    #     agency: Agency
    # },
    # type Evidence {
    #     id: String
    #     url: String
    #     file: String
    #     description: String
    #     caseId:String
    # },
    
`