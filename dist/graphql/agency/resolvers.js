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
const agency_1 = __importDefault(require("../../services/agency"));
const notification_1 = __importDefault(require("../../services/notification"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
const TransactionManager_1 = __importDefault(require("../../managers/TransactionManager"));
const queries = {
    getAgencyCases: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside GetAgencyCases");
        try {
            // console.log("Context",context.user.role);   
            const cases = yield agency_1.default.getAgencyCases({ agencyId: context.user.id });
            const casesData = cases.map((item) => {
                return item.case;
            });
            console.log("Cases", casesData);
            return new ApiResponse_1.default(200, "Agency Cases", casesData);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    }),
    getAllCases: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside for getAllCases");
        try {
            if (context.user.role != 'AGENCY') {
                throw new ApiError_1.default(401, 'Unauthorized');
            }
            const cases = yield agency_1.default.getAllCases();
            // console.log("All files", cases)
            const casesFile = cases.map((item) => {
                return Object.assign(Object.assign({}, item.case), { agency: item.agency });
            });
            // console.log("All files", casesFile)
            return new ApiResponse_1.default(200, "All Registered Cases", casesFile);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    })
};
const mutations = {
    agencyRegister: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside AgencyRegister", args);
        try {
            const register = yield agency_1.default.agencyRegister(args.data);
            return new ApiResponse_1.default(201, "Agency Registered", register);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    }),
    updateAlert: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside UpdateAlert", args);
        try {
            const alert = yield agency_1.default.updateAlert(args);
            return new ApiResponse_1.default(200, "Alert Updated", alert);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    }),
    updateCaseStatus: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside UpdateCaseStatus", args);
        try {
            const check_case_agency = yield agency_1.default.getAgencyCaseMap({ agencyId: context.user.id, caseId: args.id });
            console.log("Check Case Agency", check_case_agency);
            if (!check_case_agency) {
                return new ApiError_1.default(404, "No case in your control");
            }
            return yield TransactionManager_1.default.startTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
                const update = yield agency_1.default.updateCaseStatus(args);
                yield notification_1.default.createNotification({
                    messageType: args.status == "APPROVED" ? 'CASE_ACCEPT' : 'CASE_REJECT', data: {
                        name: update.name,
                        agency_name: check_case_agency.agency.name
                    }, type: "PERSONAL", receiverId: update.accountId
                });
                return new ApiResponse_1.default(200, "Case Updated", update);
            }));
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    })
};
exports.resolvers = { queries, mutations };
