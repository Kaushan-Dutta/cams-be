"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const user_1 = __importDefault(require("../services/user"));
const account_typedefs = `#graphql
    enum Role {
        ADMIN
        USER
        AGENCY
    }
    type Account {
        id: ID!
        email: String!
        password: String!
        role: Role!
    }
    type Response {
        message: String!
        data: String
    }
`;
const account_query = `#graphql
        getCurrAccount: Account
        accountLogin(email: String!, password: String!): Response
`;
const account_mutation = `#graphql
        accountRegister(email: String!, password: String!): Response
`;
const queries = {
    getCurrAccount: () => {
    },
    accountLogin: (parent, args) => {
    }
};
const mutations = {
    accountRegister: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(args);
        const userService = user_1.default.createUser(args);
        return userService;
    })
};
exports.Account = {
    typedefs: account_typedefs,
    queries: account_query,
    mutations: account_mutation,
    resolvers: {
        Query: queries,
        Mutation: mutations
    }
};
