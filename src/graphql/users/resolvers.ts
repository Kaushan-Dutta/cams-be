//@ts-nocheck
const mutations={
    caseRegister:async(parent,args,context)=>{
        console.log(args);
        return {message:"Case Registered"}
    }
}
export const resolvers={mutations}