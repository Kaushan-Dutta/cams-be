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
        password: String
        role: Role!
        name: String
        phone: String
    }
    type Response {
        message: String!
        data: String
    }

`

const account_query = `#graphql
        accountLogin(email: String!, password: String!): Response,
        getAccount: Account
`

const account_mutation = `#graphql
    updateAccount(password: String, name: String, phone: String): Response
`

const queries = {
    
    accountLogin: async (parent,args,context) => {
        console.log("Args:Outside",args);
        try {
            const accountService = await AccountService.accountLogin(args);
            if(accountService){
                return {message:"User Logged In",data:accountService}            
            }
        }
        catch (err) {
            return {message:err.message}
        }
    },
    getAccount: async (parent,args,context) => {
    
        try {
            return context
        }
        catch (err) {
            throw new Error(err.message)
        }
    },
    
}
const mutations = {
    updateAccount: async (parent,args,context) => {
        console.log("Args:Outside in updation",args);
        try {
            const update=await AccountService.updateAccount({...args,id:context.id});
            console.log("The updateion",update);
            if(update){
                return {message:"Account Updated"}            
            }
        }
        catch (err) {
            return {message:err.message}
        }
    }
}
export const Account = {
    typedefs: typedefs,
    queries: account_query,
    mutations:account_mutation,
    resolvers: {
        queries: queries,
        mutations:mutations
    }
}