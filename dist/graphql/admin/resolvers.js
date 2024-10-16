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
const notification_1 = __importDefault(require("../../services/notification"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
const TransactionManager_1 = __importDefault(require("../../managers/TransactionManager"));
const redis_config_1 = __importDefault(require("../../lib/redis.config"));
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
    }),
    getEvents: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside GetEvents", args);
        try {
            let cachedEvent = yield redis_config_1.default.get("events");
            if (cachedEvent) {
                return new ApiResponse_1.default(200, "Events from cached", JSON.parse(cachedEvent));
            }
            const events = yield admin_1.default.getEvents();
            yield redis_config_1.default.set("events", JSON.stringify(events), { "EX": 600 });
            return new ApiResponse_1.default(200, "Events", events);
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
            return yield TransactionManager_1.default.startTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
                return yield admin_1.default.updateAgencyFormStatus(args);
            }));
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    }),
    createEvent: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Args:Outside CreateEvent", args);
        try {
            if (context.user.role != 'ADMIN') {
                throw new ApiError_1.default(401, "Unauthorized");
            }
            return yield TransactionManager_1.default.startTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
                const event = yield admin_1.default.createEvent(args.data);
                const notification = yield notification_1.default.createNotification({ messageType: "EVENT", data: args.data, type: "BROADCAST" });
                if (notification) {
                    return new ApiResponse_1.default(201, "Event Created", { event, notification });
                }
                else {
                    throw new ApiError_1.default(404, "Event Not Found", {}, false);
                }
            }));
        }
        catch (err) {
            throw new ApiError_1.default(500, err.message, {}, false);
        }
    })
};
exports.resolvers = { queries, mutations };
