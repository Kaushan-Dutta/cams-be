import UserService from "../services/user"

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
`

const account_query = `#graphql
        getCurrAccount: Account
        accountLogin(email: String!, password: String!): Response
`

const account_mutation = `#graphql
        accountRegister(email: String!, password: String!): Response
`

const queries = {
    getCurrAccount: () => {
    },
    accountLogin: (parent: any, args: { email: string; password: string }) => {
    }
}

const mutations = {
    accountRegister: async(parent: any, args: { email: string; password: string }) => {
        console.log(args);
        const userService = UserService.createUser(args);
        return userService;
    }
}
export const Account = {
    typedefs: account_typedefs,
    queries: account_query,
    mutations: account_mutation,
    resolvers: {
        Query: queries,
        Mutation: mutations
    }
}