import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { createApolloServer } from './graphql';
import AccountService from './services/account';
import * as dotenv from 'dotenv';
import cors from "cors";
import redisclient from './lib/redis.config';
// import cookieParser from 'cookie-parser';
import cookie from 'cookie';

dotenv.config();

export type InputProps = {
    parent: any,
    args: any,
    context?: any
}

async function init() {
    const app = express();

    app.use(express.json());
    // app.use(cookieParser());
    app.use(cors(
        {
            origin: true,
            // methods: 'GET,PUT,PATCH,POST,DELETE',
            // preflightContinue: false,
            // optionsSuccessStatus: 204,
            // allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }
    ));
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Server up and running" });
    });

    await redisclient.connect();
    console.log('Redis running on port 6739');

    await createApolloServer.start();

    app.use('/graphql', expressMiddleware(createApolloServer,{
        // @ts-ignore
        context: ({ req, res }) => {
            // console.log(req?.headers?.cookie?.split('=')[1] );
            const token = req.headers['authorization']?.split(' ')[1] || req?.headers?.cookie?.split('=')[1] ;
            if (token) {
                // console.log("Token:", token);
                const decoded = AccountService.decodeJWT({ token });
                // console.log("Decoded:", decoded);
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

}

init();
