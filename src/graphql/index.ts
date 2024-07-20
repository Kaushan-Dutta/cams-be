import { ApolloServer } from '@apollo/server';
import { Account } from './account';
import { Agency } from './agency';

const createApolloServer = new ApolloServer({
    typeDefs:  `
        ${Account.typedefs}
        ${Agency.typedefs}
        type Query {
            ${Account.queries}
            ${Agency.queries}
        }
        type Mutation {
            ${Agency.mutations}
        }
    `,
    resolvers: {
        Query: {
            ...Account.resolvers.queries,
            ...Agency.resolvers.queries
        },
        Mutation: {
            ...Agency.resolvers.mutations
        }
    }
});

export { createApolloServer };
