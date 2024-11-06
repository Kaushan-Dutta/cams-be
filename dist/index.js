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
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const http_1 = __importDefault(require("http"));
const graphql_1 = require("./graphql");
const account_1 = __importDefault(require("./services/account"));
const cors_1 = __importDefault(require("cors"));
const redis_config_1 = __importDefault(require("./lib/redis.config"));
const node_config_1 = __importDefault(require("./lib/node.config"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: true,
            credentials: true
        }));
        app.get('/', (req, res) => {
            res.status(200).json({ message: "Server up and running" });
        });
        yield redis_config_1.default.connect();
        console.log('Redis: 6739');
        yield graphql_1.createApolloServer.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(graphql_1.createApolloServer, {
            // @ts-ignore
            context: ({ req, res }) => {
                var _a, _b, _c;
                const token = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || ((_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.cookie) === null || _c === void 0 ? void 0 : _c.split('=')[1]);
                if (token) {
                    const decoded = account_1.default.decodeJWT({ token });
                    return { user: decoded, res };
                }
                return { res };
            }
        }));
        const httpServer = http_1.default.createServer(app);
        const PORT = node_config_1.default.PORT || 5000;
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        return app;
    });
}
const app = init();
exports.default = app;
