export const typedefs=`#graphql
    input CaseFormInput {
        type: CaseType!
        name: String!
        phone: String!
        pincode: String!
        evidence: [EvidenceInput]
        document: String
        
    }   
`