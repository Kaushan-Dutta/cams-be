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
const account_1 = __importDefault(require("../services/account"));
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
        accountLogin(email: String!, password: String!): Response
`;
const queries = {
    accountLogin: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(args);
        try {
            const accountService = yield account_1.default.accountLogin(args);
            return accountService;
        }
        catch (err) {
            return err;
        }
    })
};
exports.Account = {
    typedefs: account_typedefs,
    queries: account_query,
    resolvers: {
        Query: queries,
    }
};
