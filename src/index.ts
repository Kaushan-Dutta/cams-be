import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { createApolloServer } from './graphql';
import AccountService from './services/account';
import * as dotenv from 'dotenv';
import cors from "cors";

dotenv.config(); 

export type InputProps={
    parent:any,
    args:any,
    context?:any
}

async function init() {
    const app = express();
    
    app.use(express.json());
    app.use(cors(
        {
            origin: true,
            // methods: 'GET,PUT,PATCH,POST,DELETE',
            // preflightContinue: false,
            // optionsSuccessStatus: 204,
            // allowedHeaders: ['Content-Type', 'Authorization'],
        }
    ));
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Server up and running" });
    });

    await createApolloServer.start();

    app.use('/graphql', expressMiddleware(createApolloServer,{
        // @ts-ignore
        context: ({ req }) => {
            const token=(req.headers['authorization'])?.split(' ')[1];
            // console.log(token);
            if(token){
                return AccountService.decodeJWT({token:token});
            }
        }
    }));

    const httpServer = http.createServer(app);

    const PORT = process.env.PORT || 5000;

    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

init();
