//@ts-nocheck

import CaseService from "../../services/case";

const case_query = `#graphql
    getCase(id:String!): Case
`
const case_mutation = `#graphql
    updateCase(data:[EvidenceInput],caseId:String!): Response
`
const queries={
        
        getCase: async (parent,args,context) => {
            console.log("Args:Outside for alerts",args);
            try {
                const _case=await CaseService.getCase({id:args.id});
                console.log("Case",_case);

                return {
                    ..._case.case,
                    account:_case.case.account,
                    agency:_case.agency
                };
            }
            catch (err) {
                return {message:err.message}
            }
        }
}
const mutations={
        
    updateCase: async (parent,args,context) => {
        console.log("Args:Outside in case",args);
        try {
            const _caseUpdate = await CaseService.updateEvidence(args);
            if(_caseUpdate){
                return {message:"Case Updated"}            
            }

        }
        catch (err) {
            console.log(err.message)
            return {message:err.message}
        }
    }
}
export const Case = {
    queries: case_query,
    mutations:case_mutation,
    resolvers: {
        queries: queries,
        mutations:mutations
    }
}