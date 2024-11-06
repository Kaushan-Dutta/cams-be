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
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const db_config_1 = require("../lib/db.config");
const utils_1 = require("../utils");
class UserService {
    static userRegister(payload) {
        console.log("Args:Inside UserRegister", payload);
        const { email, password } = payload;
        return db_config_1.db.account.create({
            data: {
                email: email,
                password: password,
            },
        });
    }
    static caseRegister(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Args:Inside CaseRegister", payload);
            const { type, name, phone, pincode, document, account } = payload;
            const caseNo = yield (0, utils_1.caseIdGenerator)(pincode);
            return db_config_1.db.caseApplication.create({
                data: {
                    caseNo: caseNo,
                    type: type,
                    name: name,
                    phone: phone,
                    pincode: pincode,
                    document: document,
                    accountId: account,
                }
            });
        });
    }
    static mapCaseAgency(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Args:Inside MapCaseAgency", payload);
            const { caseId, agencyId } = payload;
            return db_config_1.db.caseAgencyMap.create({
                data: {
                    agencyId: agencyId,
                    caseId: caseId,
                }
            });
        });
    }
    static updateCaseEvidence(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Args:Inside UpdateCaseEvidence", payload);
            const { account, evidence } = payload;
            for (let i = 0; i < evidence.length; i++) {
                yield db_config_1.db.evidence.create({
                    data: Object.assign({ caseId: account }, evidence[i])
                });
            }
            return true;
        });
    }
    static getCases(payload) {
        console.log("Args:Inside the getCases", payload);
        return db_config_1.db.caseApplication.findMany({
            where: {
                accountId: payload.accounId
            }
        });
    }
}
exports.default = UserService;
