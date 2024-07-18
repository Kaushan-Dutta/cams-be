"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = exports.queries = exports.account_mutation = exports.account_query = exports.account_typedefs = void 0;
exports.account_typedefs = `#graphql
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
exports.account_query = `#graphql
    getCurrAccount:Account,
    accountLogin(email:String!,password:String!):JSON,
`;
exports.account_mutation = `#graphql
    accountRegister(email:String!,password:String!):,JSON
`;
exports.queries = {
    getCurrAccount: () => { },
    accountLogin: () => { }
};
exports.mutations = {
    accountRegister: () => { }
};
