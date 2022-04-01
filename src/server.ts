import express from 'express';
import cors from 'cors';
import compression from 'compression';
import expressPlayground from 'graphql-playground-middleware-express';

import schema from './schema';

import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

import environments from './config/environments';
import Database from './lib/database';
import { IContext } from './interfaces/context.interface';

// Set environment variables
if(process.env.NODE_ENV !== 'production') {
    const env = environments;
    console.log(env);
}

async function init() {

    const app = express();

    app.use(cors());
    app.use(compression());

    const database = new Database();
    const db = await database.init();

    const context = async({req, connection}: IContext) => {
        const token = (req) ? req.headers.authorization : connection.authorization;
        return { db, token };
    };

    const server = new ApolloServer({
        schema,
        introspection: true,
        context
    });

    await server.start();

    server.applyMiddleware({app});

    app.get('/', expressPlayground({
        endpoint: '/graphql'
    }));

    const httpServer = createServer(app);
    const PORT = process.env.PORT || 2001;

    httpServer.listen(
        {
            port: PORT
        },
        () => console.log(`http://localhost:${PORT} Server Works!`));

}

init();