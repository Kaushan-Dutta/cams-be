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
const user_1 = __importDefault(require("../../services/user"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
// import TransactionService from "../../services/transaction";
const queries = {
    getUserCases: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args: Outside of GetUserCases", args);
        try {
            if (context.user.role != "USER") {
                throw new ApiError_1.default(401, "Unauthorized", {}, false);
            }
            // const caseKey = `cases:${context.user.id}`;
            // console.log("Case Key:", caseKey);
            // let cachedCases = await redisclient.get(caseKey);
            // if (cachedCases) {
            //     console.log("Returning cached cases");
            //     return new ApiResponse(200, "User Cases from cached", JSON.parse(cachedCases));
            // }
            const getCases = yield user_1.default.getCases({ accounId: context.user.id });
            // await redisclient.set(caseKey, JSON.stringify(getCases), { "EX": 600 });
            return new ApiResponse_1.default(200, "User Cases", getCases);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    }),
};
const mutations = {
    register: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside Register", args);
        try {
            const register = yield user_1.default.userRegister(args);
            return new ApiResponse_1.default(202, "User Registered", register);
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    })
};
exports.resolvers = { mutations, queries };
