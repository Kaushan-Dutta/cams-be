"use strict";
//@ts-nocheck
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
const queries = {
    getAgencyForms: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(args);
        return { message: "Agency Forms fetched" };
    })
};
const mutations = {
    updateAgencyFormStatus: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside", args);
        try {
            const update = yield admin_1.default.updateAgencyFormStatus(args);
            if (update) {
                return { message: "Agency Form Status Updated" };
            }
        }
        catch (err) {
            return { message: err.message };
        }
        return { message: "Agency Form Status Updated" };
    }),
    createEvent: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside", args);
        try {
            const event = yield admin_1.default.createEvent(args.data);
            if (event) {
                return { message: "Event Created" };
            }
        }
        catch (err) {
            return { message: err.message };
        }
    })
};
exports.resolvers = { queries, mutations };
