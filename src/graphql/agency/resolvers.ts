//@ts-nocheck

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
        console.log(args);
        return {message:"Application Submitted"}
    },
    updateAlert:async(parent,args,context)=>{
        console.log(args);
        return {message:"Alert Updated"}
    }
}
export const resolvers={queries,mutations}