import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import CaseService from "../../services/case";

const case_query = `#graphql
    getCase(id:String!): Response
`
const case_mutation = `#graphql
    updateCase(data:[EvidenceInput],caseId:String!): Response
`
const queries = {

    getCase: async (parent:any, args:any, context:any) => {
        console.log("Args:Outside GetCase", args);
        try {
            const _case = await CaseService.getCase({ id: args.id });
            console.log("Case", _case);
            if (_case) {
                return new ApiResponse(200, "Get Case", {
                    ..._case.case,
                    account: _case.case.account,
                    agency: _case.agency
                });
            }
            return new ApiError(404,"Case not Found")
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
const mutations = {

    updateCase: async (parent:any, args:any, context:any) => {
        console.log("Args:Outside in case", args);
        try {
            const _caseUpdate = await CaseService.updateEvidence(args);
            return new ApiResponse(200,"Case Updated",_caseUpdate);

        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const Case = {
    queries: case_query,
    mutations: case_mutation,
    resolvers: {
        queries: queries,
        mutations: mutations
    }
}