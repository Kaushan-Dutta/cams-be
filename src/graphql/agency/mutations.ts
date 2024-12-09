export const mutations = `#graphql
    agencyRegister(data:AgencyApplyForm):Response ,
    updateCaseStatus(id:ID,status:String): Response,
    sendCaseReq(caseId:String!,requestMessage:String!): Response,
`