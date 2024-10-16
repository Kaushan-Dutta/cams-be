import AccountService from '../../services/account'
import redisclient from '../../lib/redis.config'
import ApiError from '../../utils/ApiError'
import ApiResponse from '../../utils/ApiResponse'
import { ResolverProps } from '../../types'
import { GraphQLJSON } from 'graphql-type-json';

const account_query = `#graphql
        accountLogin(email: String!, password: String!): Response,
        accountLogout: Response,

        getAccount: Response
`

const account_mutation = `#graphql
    updateAccount(password: String, name: String, phone: String): Response
`

const queries = {

    accountLogin: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside AccounLogin", args);
        try {
            if (!context?.user?.id) {
                const login = await AccountService.accountLogin(args);
        
                if (login) {
                    context.res.cookie('jwtToken', login, {
                        maxAge: 60 * 60 * 1000*7 , 
                        httpOnly: true,
                        path: '/',
                        secure: true
                    });
                    // console.log(context.res);
                    return new ApiResponse(200, "Accountlogin", login)
                }
                return new ApiResponse(404, "Account Not Found")
            }
            return new ApiResponse(200, "Already LoggedIn")
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
        
    },
    accountLogout: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside AccounLogout", args);
        try {
            context?.res?.cookie('jwtToken', '', {
                maxAge: 0,
            })
            return new ApiResponse(200, "Accountlogout")

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    getAccount: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetAccount", args);

        try {
            // console.log(context.user);
            return new ApiResponse(200, "Your account", context.user);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },

}
const mutations = {
    updateAccount: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside in updation", args);
        try {
            const update = await AccountService.updateAccount({ ...args, id: context.user.id });
            console.log("The updateion", update);
            return new ApiResponse(200, "Account Updated", update)
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const Account = {
    queries: account_query,
    mutations: account_mutation,
    resolvers: {
        JSON: GraphQLJSON,
        queries: queries,
        mutations: mutations
    }
}