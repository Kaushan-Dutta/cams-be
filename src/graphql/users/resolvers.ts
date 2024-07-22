
//@ts-nocheck
import UserService from "../../services/user";

const mutations={
    caseRegister:async(parent,args,context)=>{
        console.log("Args:Outside",args,context);
        if(context.role==="USER"){
            try{
                const caseRegister=await UserService.caseRegister({account:context.id,...args.data});
                console.log("Case Register",caseRegister);

                if(caseRegister){
                    // console.log("Args evidence",args.data.evidence);
                    if(args.data.evidence){
                        // console.log(args.evidence);
                        const updateCaseEvidence=await UserService.updateCaseEvidence({account:caseRegister.id,evidence:args.data.evidence});
                        if(updateCaseEvidence){
                            return {message:"Case Registered and Evidence Updated"}
                        }
                    
                    }
                    return {message:"Case Registered"  }
                }
            }
            catch(err){
                return {message:err.message}
        }}
        else{
            throw new Error("Unauthorized")
        }
    },
    register:async(parent,args,context)=>{
        console.log("Args:Outside",args);
        try {
            const accountService = await UserService.userRegister(args);
            if(accountService){
                return {message:"User Registered"}            
            }
        }
        catch (err) {
            return {message:err.message}
        }
    }
}
export const resolvers={mutations}