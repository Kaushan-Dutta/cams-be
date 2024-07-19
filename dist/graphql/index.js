"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const server_1 = require("@apollo/server");
const account_1 = require("./account");
const createApolloServer = new server_1.ApolloServer({
    typeDefs: `
       ${account_1.Account.typedefs},
        type Query{
              ${account_1.Account.queries}
        }
    `,
    resolvers: {
        Query: account_1.Account.resolvers.Query
    }
});
exports.createApolloServer = createApolloServer;
