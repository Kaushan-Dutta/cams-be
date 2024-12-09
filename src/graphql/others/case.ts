import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import CaseService from "../../services/case";
// import TransactionService from "../../services/transaction";
import Locationservice from "../../services/location";
import AgencyService from "../../services/agency";

const case_query = `#graphql
    getCase(id:String!): Response
    getCaseHistory(caseId:String!): Response
`
const case_mutation = `#graphql
    updateCase(evidences:[EvidenceInput],participants:[CaseParticipantInput],caseId:String!): Response
`
const queries = {

    getCase: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetCase", args);
        try {
            const _case = await CaseService.getCase({ id: args.id });
            console.log("Case", _case);
            return new ApiResponse(200, "Get Case", 
                // {
            //     ..._case.case,
            //     // account: _case.case.account,
            //     agency: _case.agency
            // }
            _case);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    getCaseHistory: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside GetCaseHistory", args);
        try {
            // const _case = await TransactionService.getCase({ caseId: args.caseId });
            // console.log("Case", _case);
            // if (_case) {
            //     return new ApiResponse(200, "Get Case History", {
            //         ..._case.case,
            //         account: _case.case.account,
            //         agency: _case.agency
            //     });
            // }
            // return new ApiError(404, "Case not Found")
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}

const mutations = {
    caseRegister: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside CaseRegister", args);
        try {
            const latitude = Math.round(args.data.latitude * 1000) / 1000;
            const longitude = Math.round(args.data.longitude * 1000) / 1000;

            const location = await Locationservice.addLocationDetails(latitude, longitude);
            if (!location) {
                throw new ApiError(404, "Location not regsiterded", {}, false);
            }
            let agencyId;
            if(context.user.role === 'AGECY') {
                agencyId = context.user.id;
            }
            else if (context.user.role === 'USER') {

                args.data.participants.push({
                    type:"COMPLAINANT",
                    accountId:context.user.id,
                });

                const nearestAgency = await AgencyService.getNearestAgency({ latitude, longitude });
                console.log("Agency", nearestAgency);

                if (!nearestAgency) {
                    throw new ApiError(404, "No Agency in this location", {});
                }
                agencyId = nearestAgency;
            }

            const caseRegister = await CaseService.caseRegister({ locationId:location.id, reporter:context.user.role,...args.data });
            console.log("Case Register", caseRegister);

            if (!caseRegister) {
                throw new ApiError(405, "Case Registration Failed", {});
            }
            const mapCaseAgency = await CaseService.mapCaseAgency({ caseId: caseRegister.id, agencyId });
            console.log(mapCaseAgency)

            if (!mapCaseAgency) {
                throw new ApiError(405, "Case Registration Failed", {});
            }

            if (args.data.evidence.length > 0) {
                await CaseService.updateCaseEvidence({ caseId: caseRegister.id, evidence: args.data.evidence });

            }
            if (args.data.participants.length > 0) {
                await CaseService.updateCaseParticipant({ caseId: caseRegister.id, participant: args.data.participants });
            }
            return new ApiResponse(200, "Case Report sent to Agency", { caseRegister })



        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    },
    updateCase: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside in case", args);
        try {
            if(args.evidences.length > 0) {
                await CaseService.updateCaseEvidence({ caseId: args.caseId, evidence: args.evidences });
            }
            if(args.participants.length > 0) {
                await CaseService.updateCaseParticipant({ caseId: args.caseId, participant: args.participants });
            }
            // const _caseUpdate = await CaseService.updateEvidence(args);
            // if (!_caseUpdate) {
            //     return new ApiError(404, "Case not Found")
            // }
            // const blockTransaction = await TransactionService.addEvidence({ caseId: args.caseId, accountId: context.user.id })
            // console.log(blockTransaction);
            return new ApiResponse(200, "Case Updated");
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