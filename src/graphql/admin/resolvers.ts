//@ts-nocheck

import AdminService from "../../services/admin";

const queries={
    getAgencyForms:async(parent,args,context)=>{
        try{
            const forms=await AdminService.getAgencyForms();
            return forms
        }
        catch(err){
            return {message:err.message}
        }
    },
    getEvents:async(parent,args,context)=>{
        console.log("Agrs:Outside ",args);
        try{
            const events=await AdminService.getEvents();
            return events
        }
        catch(err){
            return {message:err.message}
        }
    }
}
const mutations={
    updateAgencyFormStatus:async(parent,args,context)=>{
        console.log("Args:Outside in update form",args);
        try{
            const update=await AdminService.updateAgencyFormStatus(args);
            if(update){
                return {message:"Agency Form Status Updated"}
            }
        }
        catch(err){
            return {message:err.message}
        }
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