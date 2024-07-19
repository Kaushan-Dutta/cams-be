import { ApolloServer } from '@apollo/server';
import { Account } from './account';

const createApolloServer = new ApolloServer({
    typeDefs: `
       ${Account.typedefs},
        type Query{
              ${Account.queries}
        }
    `,
    resolvers: {
        Query:Account.resolvers.Query
    }
});

export { createApolloServer };
