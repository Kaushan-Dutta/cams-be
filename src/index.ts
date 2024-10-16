import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { createApolloServer } from './graphql';
import AccountService from './services/account';
import * as dotenv from 'dotenv';
import cors from "cors";
import redisclient from './lib/redis.config';

dotenv.config();

export type InputProps = {
    parent: any,
    args: any,
    context?: any
}

async function init() {
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: true,
        credentials: true
    }));

    app.get('/', (req, res) => {
        res.status(200).json({ message: "Server up and running" });
    });

    await redisclient.connect();
    console.log('Redis running on port 6739');

    await createApolloServer.start();

    app.use('/graphql', expressMiddleware(createApolloServer, {
        // @ts-ignore
        context: ({ req, res }) => {
            const token = req.headers['authorization']?.split(' ')[1] || req?.headers?.cookie?.split('=')[1];
            if (token) {
                const decoded = AccountService.decodeJWT({ token });
                return { user: decoded, res };
            }
            return { res };
        }
    }));

    const httpServer = http.createServer(app);

    const PORT = process.env.PORT || 5000;

    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    return app;  
}

const app = init();  
export default app;
