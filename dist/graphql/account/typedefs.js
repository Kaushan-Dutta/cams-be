"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
exports.typedefs = `#graphql
    enum Role {
        ADMIN,
        USER,
        AGENCY
    }
    type Account{
        id: ID!
        email: String!
        password: String!
        role:Role!
    }
`;
