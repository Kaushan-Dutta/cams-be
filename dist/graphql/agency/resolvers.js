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
const notification_1 = __importDefault(require("../../services/notification"));
// id: String
//         accountId: String
//         status: CaseStatus
//         agencyId: String
//         userId: String
//         createdAt: String
//         type: CaseType
const queries = {
    getAgencyCases: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside ");
        try {
            // console.log("Context",context.role);   
            const cases = yield agency_1.default.getAgencyCases({ agencyId: context.id });
            const casesData = cases.map((item) => {
                return item.case;
            });
            // console.log("Cases",cases);
            return casesData;
        }
        catch (err) {
            return { message: err.message };
        }
    }),
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
    }),
    updateCaseStatus: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:outside", args);
        try {
            const check_case_agency = yield agency_1.default.getAgencyCaseMap({ agencyId: context.id, caseId: args.id });
            console.log("Check Case Agency", check_case_agency);
            if (!check_case_agency) {
                return { message: "Case not assigned to Agency" };
            }
            const update = yield agency_1.default.updateCaseStatus(args);
            if (update) {
                const notification = yield notification_1.default.createNotification({
                    messageType: args.status == "APPROVED" ? 'CASE_ACCEPT' : 'CASE_REJECT', data: {
                        name: update.name,
                        agency_name: check_case_agency.agency.name
                    }, type: "PERSONAL", receiverId: update.accountId
                });
                return { message: "Case Status Updated" };
            }
            return { message: "Case Status not updated" };
        }
        catch (err) {
            console.log("Error", err.message);
            throw new Error(err.message);
        }
    })
};
exports.resolvers = { queries, mutations };
