import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { ResolverProps } from "../../types";
import CaseService from "../../services/case";
// import TransactionService from "../../services/transaction";
import Locationservice from "../../services/location";
import AgencyService from "../../services/agency";
import TransactionService from "../../services/transaction";
import { Account } from "./account";
import AccountService from "../../services/account";

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
            const _case = await TransactionService.getCase({ caseId: args.caseId });
            console.log("Case", _case);
            if(!_case){
                return new ApiError(404, "Case not Found")
            }
            for(let i=0;i<_case.evidences.length;i++) {
                _case.evidences[i].handler = await AccountService.getAccount({ id: _case.evidences[i].handlerId });
                _case.evidences[i].tag="EVIDENCE";
            }
            for(let i=0;i<_case.caseParticipants.length;i++) {
                _case.caseParticipants[i].handler = await AccountService.getAccount({ id: _case.caseParticipants[i].handlerId });
                _case.caseParticipants[i].tag="PARTICIPANT";
            }
            // console.log("Case History", _case.evidences);

            let caseHistory:any = [];
            caseHistory.push(..._case.evidences);
            // console.log("Case History", caseHistory);
            caseHistory.push(..._case.caseParticipants);
            caseHistory.sort((a:any,b:any) => {
                return b.timestamp - a.timestamp;
            })            
            return new ApiResponse(200, "Get Case History", caseHistory);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}

const mutations = {
    caseRegister: async (parent: any, args: any, context: any) => {
        console.log("Args:Outside CaseRegister", args.data.evidence);
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

                args.data.participant.push({
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
            console.log(location, agencyId,args.data);
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
            if (args.data.participant.length > 0) {
                await CaseService.updateCaseParticipant({ caseId: caseRegister.id, participant: args.data.participant });
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
            if(args.evidences.length > 0) {
                const {transactionHash}=await TransactionService.addEvidence({ caseId: args.caseId, accountId: context.user.id });
                console.log("The transaction hash is", transactionHash);
            }
            if(args.participants.length > 0) {
                const {transactionHash}=await TransactionService.addParticipant({ caseId: args.caseId, accountId: context.user.id });
                console.log("The transaction hash is", transactionHash);
            }
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