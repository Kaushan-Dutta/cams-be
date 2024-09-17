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
        id: String!
        name: String!
        pincode: String!
        document: String!
        status: ApplicationStatus!
        phone: String!
        latitude: String!
        longitude: String!
    },
    type Event {
        id:String!
        name: String!
        description: String!
        date: String!
        location: String!
    },
`;
