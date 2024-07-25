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
const user_1 = __importDefault(require("../../services/user"));
const mutations = {
    caseRegister: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside", args, context);
        if (context.role === "USER") {
            try {
                const getAgencyFromPincode = yield agency_1.default.getAgencyFromPincode({ pincode: args.data.pincode });
                console.log("Agency", getAgencyFromPincode);
                if (getAgencyFromPincode) {
                    const caseRegister = yield user_1.default.caseRegister(Object.assign({ account: context.id }, args.data));
                    console.log("Case Register", caseRegister);
                    if (caseRegister) {
                        // console.log("Args evidence",args.data.evidence);
                        const mapCaseAgency = yield user_1.default.mapCaseAgency({ caseId: caseRegister.id, agencyId: getAgencyFromPincode.accountId });
                        if (mapCaseAgency) {
                            console.log("Case Registered and Agency Mapped");
                        }
                        if (args.data.evidence) {
                            // console.log(args.evidence);
                            const updateCaseEvidence = yield user_1.default.updateCaseEvidence({ account: caseRegister.id, evidence: args.data.evidence });
                            if (updateCaseEvidence) {
                                return { message: "Case Registered and Evidence Updated" };
                            }
                        }
                        return { message: "Case Registered" };
                    }
                }
            }
            catch (err) {
                return { message: err.message };
            }
        }
        else {
            throw new Error("Unauthorized");
        }
    }),
    register: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside", args);
        try {
            const accountService = yield user_1.default.userRegister(args);
            if (accountService) {
                return { message: "User Registered" };
            }
        }
        catch (err) {
            return { message: err.message };
        }
    })
};
exports.resolvers = { mutations };
