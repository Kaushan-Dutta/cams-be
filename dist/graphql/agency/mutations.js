"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
    agencyRegister(data:AgencyApplyForm):Response ,
    updateCaseStatus(id:ID,status:String): Response,
    sendCaseReq(caseId:String!,requestMessage:String!): Response,
`;
