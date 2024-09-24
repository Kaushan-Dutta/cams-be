"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
exports.typedefs = `#graphql
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
    input CaseFilterType  {
        accountId: String
        status: CaseStatus
        agencyId: String
        userId: String
        createdAt: String
        type: CaseType
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
    }

`;
