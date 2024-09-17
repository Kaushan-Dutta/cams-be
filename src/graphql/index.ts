import { ApolloServer } from '@apollo/server';
import { Account } from './others/account';
// import { Event } from './others/events';
import { Notification } from './others/notifications';
import { Agency } from './agency';
import { Admin } from './admin';
import { User } from './users';
import { Alert } from './others/alert';

const createApolloServer = new ApolloServer({
    typeDefs:  `
        ${Account.typedefs}
        ${Agency.typedefs}
        ${Admin.typedefs}
        ${User.typedefs}
        ${Alert.typedefs}
        ${Notification.typedefs}
        type Query {
            ${Account.queries}
            ${Agency.queries}
            ${Admin.queries}
            ${Notification.queries}
            ${Alert.queries}
            ${User.queries}
        }
        type Mutation {
            ${Agency.mutations}
            ${Admin.mutations}
            ${User.mutations}
            ${Alert.mutations}
        }
    `,
    resolvers: {
        Query: {
            ...Account.resolvers.queries,
            ...Agency.resolvers.queries,
            ...Admin.resolvers.queries,
            ...User.resolvers.queries,
            ...Notification.resolvers.queries,
            ...Alert.resolvers.queries
        },
        Mutation: {
            ...Agency.resolvers.mutations,
            ...Admin.resolvers.mutations,
            ...User.resolvers.mutations,
            ...Alert.resolvers.mutations
        }
    }
});

export { createApolloServer };
