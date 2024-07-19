import AccountService from '../services/account'
import { AccountType } from '../types/account'

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
        accountLogin(email: String!, password: String!): Response
`


const queries = {
    
    accountLogin: async (parent: any, args: { email: string; password: string }) => {
        console.log(args);
        try {
            const accountService = await AccountService.accountLogin(args);
            return accountService;
        }
        catch (err) {
            return err
        }
    }
}

export const Account = {
    typedefs: account_typedefs,
    queries: account_query,
    resolvers: {
        Query: queries,
    }
}