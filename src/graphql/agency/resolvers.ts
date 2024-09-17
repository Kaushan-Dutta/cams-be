//@ts-nocheck
import AgencyService from "../../services/agency";
// id: String
//         accountId: String
//         status: CaseStatus
//         agencyId: String
//         userId: String
//         createdAt: String
//         type: CaseType
const queries={
    // getCases:async(parent,args,context)=>{
    //     console.log(args);
    //     // try{
    //     //     let filter={};

    //     //     if(args.accountId) filter.accountId=args.accountId;
    //     //     if(args.status) filter.status=args.status;
    //     //     if(args.type) filter.type=args.type;
    //     //     if(args.createdAt) filter.createdAt=args.createdAt

    //     //     const cases=await AgencyService.getCases(args);
    //     // }
    //     // catch(err){
    //     //     return {message:err.message}
    //     // }
    // },
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
        console.log("Args:outside",args);
        try{
            const update=await AgencyService.updateAlert(args);
            if(update){
                return {message:"Alert Updated"}
            }
            return {message:"Alert not updated"}
        }
        catch(err){
            return {message:err.message}
        }
    }
}
export const resolvers={queries,mutations}