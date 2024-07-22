//@ts-nocheck
import AgencyService from "../../services/agency";
const queries={
    getCases:async(parent,args,context)=>{
        console.log(args);
        return {message:"Cases fetched"}
    },
    alerts:async(parent,args,context)=>{
        return {message:"Alerts fetched"}
    }
}
const mutations={
    agencyRegister:async(parent,args,context)=>{
        console.log("Args:Outside",args);
        try{
            const register=await AgencyService.agencyRegister(args.data);
            if(register){
                return {message:"Agency Registered"}
            }
        }
        catch(err){
            return {message:err.message}
        }
    },
    updateAlert:async(parent,args,context)=>{
        console.log(args);
        return {message:"Alert Updated"}
    }
}
export const resolvers={queries,mutations}