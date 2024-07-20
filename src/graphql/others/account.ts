//@ts-nocheck
import AccountService from '../../services/account'
import { InputProps } from '../types'

const typedefs = `#graphql
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
    
    accountLogin: async (parent,args,context) => {
        console.log("Args:Outside",args);
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
    typedefs: typedefs,
    queries: account_query,
    resolvers: {
        queries: queries,
    }
}