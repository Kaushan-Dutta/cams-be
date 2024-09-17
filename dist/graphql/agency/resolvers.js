"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
//@ts-nocheck
const agency_1 = __importDefault(require("../../services/agency"));
// id: String
//         accountId: String
//         status: CaseStatus
//         agencyId: String
//         userId: String
//         createdAt: String
//         type: CaseType
const queries = {
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
    alerts: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return { message: "Alerts fetched" };
    })
};
const mutations = {
    agencyRegister: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside", args);
        try {
            const register = yield agency_1.default.agencyRegister(args.data);
            if (register) {
                return { message: "Agency Registered" };
            }
        }
        catch (err) {
            return { message: err.message };
        }
    }),
    updateAlert: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:outside", args);
        try {
            const update = yield agency_1.default.updateAlert(args);
            if (update) {
                return { message: "Alert Updated" };
            }
            return { message: "Alert not updated" };
        }
        catch (err) {
            return { message: err.message };
        }
    })
};
exports.resolvers = { queries, mutations };
