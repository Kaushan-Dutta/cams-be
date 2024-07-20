//@ts-nocheck

const queries={
    getAgencyForms:async(parent,args,context)=>{
        console.log(args);
        return {message:"Agency Forms fetched"}
    }
}
const mutations={
    updateAgencyFormStatus:async(parent,args,context)=>{
        console.log(args);
        return {message:"Agency Form Status Updated"}
    },
    createEvent:async(parent,args,context)=>{
        console.log(args);
        return {message:"Event Created"}
    }
}
export const resolvers={queries,mutations}