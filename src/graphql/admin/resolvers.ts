//@ts-nocheck

import AdminService from "../../services/admin";

const queries={
    getAgencyForms:async(parent,args,context)=>{
        console.log(args);
        return {message:"Agency Forms fetched"}
    }
}
const mutations={
    updateAgencyFormStatus:async(parent,args,context)=>{
        console.log("Args:Outside",args);
        try{
            const update=await AdminService.updateAgencyFormStatus(args);
            if(update){
                return {message:"Agency Form Status Updated"}
            }
        }
        catch(err){
            return {message:err.message}
        }
        return {message:"Agency Form Status Updated"}
    },
    createEvent:async(parent,args,context)=>{
        console.log("Args:Outside",args);
        try{
            const event = await AdminService.createEvent(args.data);
            if(event){
                return {message:"Event Created"}
            }
        }
        catch(err){
            return {message:err.message}
        }
    }
}
export const resolvers={queries,mutations}