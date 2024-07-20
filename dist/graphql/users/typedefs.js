"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
exports.typedefs = `#graphql
    input CaseFormInput {
        type: CaseType!
        name: String!
        phone: String!
        pincode: String!
        evidence: [EvidenceInput]
        document: String
        
    },
    
`;
