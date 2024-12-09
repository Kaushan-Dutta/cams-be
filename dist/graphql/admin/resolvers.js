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
const admin_1 = __importDefault(require("../../services/admin"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
const queries = {
    getAgencyForms: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside GetAgencyForms", args);
        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError_1.default(401, "Unauthorized");
            }
            const forms = yield admin_1.default.getAgencyForms();
            return new ApiResponse_1.default(200, "Agency Register Forms", forms);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    })
};
const mutations = {
    updateAgencyFormStatus: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside UpdateAgencyFormStatus", args);
        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError_1.default(401, "Unauthorized");
            }
            const getForm = yield admin_1.default.ifFormExists(args);
            if (!getForm) {
                throw new ApiError_1.default(404, "Form not found");
            }
            if (getForm.status === "APPROVED") {
                throw new ApiError_1.default(405, "Form already approved");
            }
            const updateStatus = yield admin_1.default.updateAgencyFormStatus(args);
            if (updateStatus.status != "APPROVED") {
                return new ApiResponse_1.default(200, "Form Rejected", updateStatus);
            }
            const createAcc = yield admin_1.default.createAgencyAcccount(updateStatus);
            if (!createAcc) {
                throw new ApiError_1.default(500, "Error creating account");
            }
            return new ApiResponse_1.default(200, "Form Status Updated", updateStatus);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    }),
};
exports.resolvers = { queries, mutations };
