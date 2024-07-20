"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const server_1 = require("@apollo/server");
const account_1 = require("./account");
const agency_1 = require("./agency");
const createApolloServer = new server_1.ApolloServer({
    typeDefs: `
        ${account_1.Account.typedefs}
        ${agency_1.Agency.typedefs}
        type Query {
            ${account_1.Account.queries}
            ${agency_1.Agency.queries}
        }
        type Mutation {
            ${agency_1.Agency.mutations}
        }
    `,
    resolvers: {
        Query: Object.assign(Object.assign({}, account_1.Account.resolvers.queries), agency_1.Agency.resolvers.queries),
        Mutation: Object.assign({}, agency_1.Agency.resolvers.mutations)
    }
});
exports.createApolloServer = createApolloServer;
