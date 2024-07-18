import { ApolloServer } from '@apollo/server';
import { Account } from './account';

const createApolloServer = new ApolloServer({
    typeDefs: `
       ${Account.typedefs},
        type Query{
              ${Account.queries}
        },
        type Mutation{
            ${Account.mutations}
        }
    `,
    resolvers: {
        Query: Account.resolvers.Query,
        Mutation: Account.resolvers.Mutation
    }
});

export { createApolloServer };
