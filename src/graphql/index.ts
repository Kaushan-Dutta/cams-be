import { ApolloServer } from '@apollo/server';
import { Account } from './others/account';
import { Event } from './others/events';
import { Agency } from './agency';
import { Admin } from './admin';
import { User } from './users';

const createApolloServer = new ApolloServer({
    typeDefs:  `
        ${Account.typedefs}
        ${Agency.typedefs}
        ${Event.typedefs}
        ${Admin.typedefs}
        ${User.typedefs}
        type Query {
            ${Account.queries}
            ${Agency.queries}
            ${Event.queries}
            ${Admin.queries}
        }
        type Mutation {
            ${Agency.mutations}
            ${Admin.mutations}
            ${User.mutations}
        }
    `,
    resolvers: {
        Query: {
            ...Account.resolvers.queries,
            ...Agency.resolvers.queries,
            ...Event.resolvers.queries,
            ...Admin.resolvers.queries
        },
        Mutation: {
            ...Agency.resolvers.mutations,
            ...Admin.resolvers.mutations,
            ...User.resolvers.mutations
        }
    }
});

export { createApolloServer };
