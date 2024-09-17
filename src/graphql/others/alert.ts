//@ts-nocheck

import AlertService from "../../services/alert";

const typedefs=`#graphql
    type Alert {
        id: String!
        latitude: Float!
        longitude: Float!
        status:ApplicationStatus!
        agencyId:String,
        createdAt:String
    },
    
`
const alert_query = `#graphql
    getAlerts: [Alert]
`
const alert_mutation = `#graphql
    postAlert(latitude:String,longitude:String): Response
`
const queries={
        
        getAlerts: async (parent,args,context) => {
            console.log("Args:Outside for alerts",args);
            try {
                const alerts=await AlertService.getAlerts({agencyId:context.id});
                console.log("Alerts",alerts);
                return alerts;
            }
            catch (err) {
                return {message:err.message}
            }
        }
}
const mutations={
        
    postAlert: async (parent,args,context) => {
        console.log("Args:Outside",args);
        try {
            const alertService = await AlertService.postAlert(args);
            if(alertService){
                return {message:"Alert Posted"}            
            }

        }
        catch (err) {
            console.log(err.message)
            return {message:err.message}
        }
    }
}
export const Alert = {
    typedefs: typedefs,
    queries: alert_query,
    mutations:alert_mutation,
    resolvers: {
        queries: queries,
        mutations:mutations
    }
}