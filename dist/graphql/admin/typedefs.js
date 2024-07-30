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
    type AgencyApplications {
        name: String!
        pincode: String!
        document: String!
        status: ApplicationStatus!
    },
    type Event {
        id:String!
        name: String!
        description: String!
        date: String!
        location: String!
    },
`;
