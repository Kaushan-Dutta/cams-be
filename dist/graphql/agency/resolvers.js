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
// import TransactionService from "../../services/transaction";
const location_1 = __importDefault(require("../../services/location"));
const case_1 = __importDefault(require("../../services/case"));
const queries = {
    getAgencyCases: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside GetAgencyCases");
        try {
            // console.log("Context",context.user.role);   
            const cases = yield agency_1.default.getAgencyCases({ agencyId: context.user.id });
            // const casesData = cases.map((item) => {
            //     return item.case
            // })
            console.log("Cases", cases);
            return new ApiResponse_1.default(200, "Agency Cases", cases);
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
            const latitude = Math.round(args.data.latitude * 1000) / 1000;
            const longitude = Math.round(args.data.longitude * 1000) / 1000;
            const location = yield location_1.default.addLocationDetails(latitude, longitude);
            if (!location) {
                throw new ApiError_1.default(404, "Location not regsiterded", {}, false);
            }
            const register = yield agency_1.default.agencyRegister(Object.assign({ locationId: location.id }, args.data));
            return new ApiResponse_1.default(201, "Agency Registered", register);
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
            const update = yield agency_1.default.updateCaseStatus(args);
            // const blockTransaction = await TransactionService.createCase({ agencyId: context.user.id, caseId: args.id, userId: update.accountId });
            // console.log("Block Transaction", blockTransaction);
            const complainerId = yield case_1.default.getComplainerId({ caseId: args.id });
            yield notification_1.default.createNotification({
                messageType: args.status == "APPROVED" ? 'CASE_ACCEPT' : 'CASE_REJECT', data: {
                    name: update.title,
                    agency_name: check_case_agency.agency.name
                }, type: "PERSONAL", receiverId: complainerId
            });
            return new ApiResponse_1.default(200, "Case Updated", update);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    }),
    sendCaseReq: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside SendCaseReq", args);
        try {
            if (context.user.role != "AGENCY") {
                throw new ApiError_1.default(401, 'Unauthorized');
            }
            const sendCase = yield agency_1.default.sendCaseReq(args);
            return new ApiResponse_1.default(200, "Request Sent");
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    })
};
exports.resolvers = { queries, mutations };
// (caseId:String!,requestMessage:String!): Response,
