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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const queries = {
    getCases: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(args);
        return { message: "Cases fetched" };
    }),
    alerts: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return { message: "Alerts fetched" };
    })
};
const mutations = {
    agencyRegister: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(args);
        return { message: "Application Submitted" };
    }),
    updateAlert: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(args);
        return { message: "Alert Updated" };
    })
};
exports.resolvers = { queries, mutations };
