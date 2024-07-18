import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { createApolloServer } from './graphql';

import * as dotenv from 'dotenv';

dotenv.config(); 


async function init() {
    const app = express();
    
    app.use(express.json());
    
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Server up and running" });
    });

    await createApolloServer.start();
    
    app.use('/graphql', expressMiddleware(createApolloServer));

    const httpServer = http.createServer(app);

    const PORT = process.env.PORT || 5000;

    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

init();
