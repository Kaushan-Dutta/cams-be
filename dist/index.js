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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// io.on("connection", (socket) => {
//     console.log("New client connected:", socket.id);
//     socket.on("find-match", (user) => {
//       const { id, topic, gender } = user;
//       const existingUser = users.find((u) => u.id === id);
//       if (!existingUser) {
//         users.push({
//           id: id,
//           socketId: socket.id,
//           topic: topic,
//           gender: gender,
//         });
//         console.log("New user connected:", id);
//       }
//       console.log("Users", users);
//       let bestMatch = [];
//       // if (users.length == 2) {
//       //   bestMatch.push(users[0]);
//       //   bestMatch.push(users[1]);
//       // } else {
//         for (let i = 0; i < users.length - 1; i++) {
//           for (let j = i + 1; j < users.length; j++) {
//             // if (users[i].topic === users[j].topic) {
//             //   bestMatch.push(users[i]);
//             //   bestMatch.push(users[j]);
//             //   break;
//             // }
//             bestMatch.push(users[i]);
//             bestMatch.push(users[j]);
//           }
//         }
//       console.log("Best Match", bestMatch);
//       if (bestMatch.length > 0) {
//         const user1 = bestMatch[0];
//         const user2 = bestMatch[1];
//         // socket.emit("match-found", { user1, user2 });
//         io.to(user1.socketId).emit("match-found", bestMatch);
//         io.to(user2.socketId).emit("match-found", bestMatch);
//         users = users.filter((u) => u.id !== user1.id && u.id !== user2.id);
//       }
//     });
//     socket.on("disconnect", () => {
//       users = users.filter((u) => u.socketId !== socket.id);
//       console.log("A user disconnected:", socket.id);
//     });
//   });
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: true,
            credentials: true
        }));
        app.use((0, cookie_parser_1.default)());
        app.get('/', (req, res) => {
            res.status(200).json({ message: "Server up and running" });
        });
        yield redis_config_1.default.connect();
        console.log(process.env.REDIS_URL);
        yield graphql_1.createApolloServer.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(graphql_1.createApolloServer, {
            // @ts-ignore
            context: ({ req, res }) => {
                var _a, _b;
                const token = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.jwtToken);
                if (token) {
                    const decoded = account_1.default.decodeJWT({ token });
                    return { user: decoded, res };
                }
                return { res };
            }
        }));
        const httpServer = http_1.default.createServer(app);
        const PORT = process.env.PORT;
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        return app;
    });
}
const app = init();
exports.default = app;
