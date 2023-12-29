import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
import cors from "cors"
import typeDefs from "./graphql/typeDefs.js"
import resolvers from "./graphql/resolvers.js"
import { db } from "./models/index.js"
const PORT = 8000;

(async () => {

    // Create schema, which will be used separately by ApolloServer and
    // the WebSocket server.
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Create an Express app and HTTP server; we will attach the WebSocket
    // server and the ApolloServer to this HTTP server.
    const app = express();
    const httpServer = createServer(app);

    // Set up WebSocket server.
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });
    const serverCleanup = useServer({ schema }, wsServer);

    // Set up ApolloServer.
    const server = new ApolloServer({
        schema,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return { async drainServer() { await serverCleanup.dispose() } };
                },
            },
        ],
    });




    app.use(express.json());
    app.use(cors());

    await server.start();

    app.use(
        "/graphql",
        expressMiddleware(server, { context: async () => ({ db }) })
    );


    // Now that our HTTP server is fully set up, actually listen.
    httpServer.listen(PORT, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
    });

})();

//-------------------------------------------------------------------------------------------------

// import { PubSub } from 'graphql-subscriptions';
// const pubsub = new PubSub();

// // A number that we'll increment over time to simulate subscription events
// let currentNumber = 0;

// // Schema definition
// const typeDefs = `#graphql
//   type Query {
//     currentNumber: Int
//   }

//   type Subscription {
//     numberIncremented: Int
//   }
// `;

// // Resolver map
// const resolvers = {
//     Query: {
//         currentNumber() {
//             return currentNumber;
//         },
//     },
//     Subscription: {
//         numberIncremented: {
//             subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
//         },
//     },
// };



// await server.start();
// app.use("/graphql", cors < cors.CorsRequest > (), bodyParser.json(), expressMiddleware(server));



// // In the background, increment a number every second and notify subscribers when it changes.
// function incrementNumber() {
//     currentNumber++;
//     pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
//     setTimeout(incrementNumber, 1000);
// }

// // Start incrementing
// incrementNumber();
