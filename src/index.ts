import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { createApolloServer } from './graphql';
import AccountService from './services/account';
import cors from "cors";
import redisclient from './lib/redis.config';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

export type InputProps = {
    parent: any,
    args: any,
    context?: any
}

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
  
async function init() {
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: true,
        credentials: true
    }));
    app.use(cookieParser())
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Server up and running" });
    });

    await redisclient.connect();
    console.log(process.env.REDIS_URL);

    await createApolloServer.start();

    app.use('/graphql', expressMiddleware(createApolloServer, {
        // @ts-ignore
        context: ({ req, res }) => {
            const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.jwtToken;
            if (token) {
                const decoded = AccountService.decodeJWT({ token });
                return { user: decoded, res };
            }
            return { res };
        }
    }));

    const httpServer = http.createServer(app);

    const PORT = process.env.PORT;

    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    return app;  
}

const app = init();  
export default app;
