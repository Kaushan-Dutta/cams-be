import { ApolloServer } from '@apollo/server';
import { Account } from './others/account';
import { Event } from './others/events';
import { Notification } from './others/notifications';
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
        ${Notification.typedefs}
        type Query {
            ${Account.queries}
            ${Agency.queries}
            ${Event.queries}
            ${Admin.queries}
            ${Notification.queries}
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
            ...Admin.resolvers.queries,
            ...Notification.resolvers.queries,
        },
        Mutation: {
            ...Agency.resolvers.mutations,
            ...Admin.resolvers.mutations,
            ...User.resolvers.mutations
        }
    }
});

export { createApolloServer };
