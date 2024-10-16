import { ApolloServer } from '@apollo/server';
import { Account } from './others/account';
import { Notification } from './others/notifications';
import { Agency } from './agency';
import { Admin } from './admin';
import { User } from './users';
import { Alert } from './others/alert';
import { Case } from './others/case';
import { Event } from './others/event';

import {typedefs} from './typedefs'

const createApolloServer = new ApolloServer({
    typeDefs:  `
        ${typedefs}
        type Query {
            ${Account.queries}
            ${Agency.queries}
            ${Admin.queries}
            ${Notification.queries}
            ${Alert.queries}
            ${User.queries}
            ${Case.queries}
            ${Event.queries}
        }
        type Mutation {
            ${Agency.mutations}
            ${Admin.mutations}
            ${User.mutations}
            ${Alert.mutations}
            ${Case.mutations}
            ${Account.mutations}
        }
    `,
    resolvers: {
        Query: {
            ...Account.resolvers.queries,
            ...Agency.resolvers.queries,
            ...Admin.resolvers.queries,
            ...User.resolvers.queries,
            ...Notification.resolvers.queries,
            ...Alert.resolvers.queries,
            ...Case.resolvers.queries,
            ...Event.resolvers.queries
        },
        Mutation: {
            ...Agency.resolvers.mutations,
            ...Admin.resolvers.mutations,
            ...User.resolvers.mutations,
            ...Alert.resolvers.mutations,
            ...Case.resolvers.mutations,
            ...Account.resolvers.mutations
        }
    }
});

export { createApolloServer };
