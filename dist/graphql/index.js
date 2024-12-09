"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const server_1 = require("@apollo/server");
const account_1 = require("./others/account");
const notifications_1 = require("./others/notifications");
const agency_1 = require("./agency");
const admin_1 = require("./admin");
const users_1 = require("./users");
const alert_1 = require("./others/alert");
const case_1 = require("./others/case");
const event_1 = require("./others/event");
const digitalCard_1 = require("./others/digitalCard");
const typedefs_1 = require("./typedefs");
const createApolloServer = new server_1.ApolloServer({
    typeDefs: `
        ${typedefs_1.typedefs}
        type Query {
            ${account_1.Account.queries}
            ${agency_1.Agency.queries}
            ${admin_1.Admin.queries}
            ${notifications_1.Notification.queries}
            ${alert_1.Alert.queries}
            ${users_1.User.queries}
            ${case_1.Case.queries}
            ${event_1.Event.queries}
            ${digitalCard_1.DigitalCard.queries}
        }
        type Mutation {
            ${agency_1.Agency.mutations}
            ${admin_1.Admin.mutations}
            ${users_1.User.mutations}
            ${alert_1.Alert.mutations}
            ${case_1.Case.mutations}
            ${account_1.Account.mutations}
            ${digitalCard_1.DigitalCard.mutations}
            ${event_1.Event.mutations}
        }
    `,
    resolvers: {
        Query: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, account_1.Account.resolvers.queries), agency_1.Agency.resolvers.queries), admin_1.Admin.resolvers.queries), users_1.User.resolvers.queries), notifications_1.Notification.resolvers.queries), alert_1.Alert.resolvers.queries), case_1.Case.resolvers.queries), event_1.Event.resolvers.queries), digitalCard_1.DigitalCard.resolvers.queries),
        Mutation: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, agency_1.Agency.resolvers.mutations), admin_1.Admin.resolvers.mutations), users_1.User.resolvers.mutations), alert_1.Alert.resolvers.mutations), case_1.Case.resolvers.mutations), account_1.Account.resolvers.mutations), digitalCard_1.DigitalCard.resolvers.mutations), event_1.Event.resolvers.mutations)
    }
});
exports.createApolloServer = createApolloServer;
