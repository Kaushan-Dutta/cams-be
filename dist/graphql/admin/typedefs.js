"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
exports.typedefs = `#graphql
   
    input EventInput {
        name: String!
        description: String!
        date: String!
        location: String!
    },
    enum ApplicationStatus {
        PENDING
        APPROVED
        REJECTED
    },
    type AgencyApply {
        name: String!
        email: String!
        pincode: String!
        phone: String!
        document: String!
        latitude: String!
        longitude: String!
    }
`;
