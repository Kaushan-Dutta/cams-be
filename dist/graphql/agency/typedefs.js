"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
exports.typedefs = `#graphql
    type Agency {
        name: String!
        email: String!
        pincode: String!
        phone: String!
        document: String!
        latitude: String!
        longitude: String!
    },
    input AgencyApplyForm {
        name: String!
        email: String!
        pincode: String!
        phone: String!
        document: String!
        latitude: String!
        longitude: String!
    },
    input CaseFilterType  {
        id: String
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
        caseId:String!
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
        CASE_ASSIGNED
        PROGRESS
        REJECTED
    },
    type Case {
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
    },
    type Alert {
        id: String!,
        latitude: Float!,
        longitude: Float!,
        createdAt: String!
    }

`;
