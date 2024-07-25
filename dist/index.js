"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const http_1 = __importDefault(require("http"));
const graphql_1 = require("./graphql");
const account_1 = __importDefault(require("./services/account"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: true,
            // methods: 'GET,PUT,PATCH,POST,DELETE',
            // preflightContinue: false,
            // optionsSuccessStatus: 204,
            // allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        app.get('/', (req, res) => {
            res.status(200).json({ message: "Server up and running" });
        });
        yield graphql_1.createApolloServer.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(graphql_1.createApolloServer, {
            // @ts-ignore
            context: ({ req }) => {
                var _a;
                const token = (_a = (req.headers['authorization'])) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                // console.log(token);
                if (token) {
                    return account_1.default.decodeJWT({ token: token });
                }
            }
        }));
        const httpServer = http_1.default.createServer(app);
        const PORT = process.env.PORT || 5000;
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
}
init();
