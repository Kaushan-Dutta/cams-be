"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const server_1 = require("@apollo/server");
const account_1 = require("./others/account");
// import { Event } from './others/events';
const notifications_1 = require("./others/notifications");
const agency_1 = require("./agency");
const admin_1 = require("./admin");
const users_1 = require("./users");
const alert_1 = require("./others/alert");
const createApolloServer = new server_1.ApolloServer({
    typeDefs: `
        ${account_1.Account.typedefs}
        ${agency_1.Agency.typedefs}
        ${admin_1.Admin.typedefs}
        ${users_1.User.typedefs}
        ${alert_1.Alert.typedefs}
        ${notifications_1.Notification.typedefs}
        type Query {
            ${account_1.Account.queries}
            ${agency_1.Agency.queries}
            ${admin_1.Admin.queries}
            ${notifications_1.Notification.queries}
            ${alert_1.Alert.queries}
        }
        type Mutation {
            ${agency_1.Agency.mutations}
            ${admin_1.Admin.mutations}
            ${users_1.User.mutations}
            ${alert_1.Alert.mutations}
        }
    `,
    resolvers: {
        Query: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, account_1.Account.resolvers.queries), agency_1.Agency.resolvers.queries), admin_1.Admin.resolvers.queries), notifications_1.Notification.resolvers.queries), alert_1.Alert.resolvers.queries),
        Mutation: Object.assign(Object.assign(Object.assign(Object.assign({}, agency_1.Agency.resolvers.mutations), admin_1.Admin.resolvers.mutations), users_1.User.resolvers.mutations), alert_1.Alert.resolvers.mutations)
    }
});
exports.createApolloServer = createApolloServer;
