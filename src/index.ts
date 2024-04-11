import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const port = Number(process.env.PORT) || 3000;

async function StartServer() {
  const app = express();
  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String,
            say(name : String) : String,
        }
    `,
    resolvers: {
      Query: {
        hello: () => {
          return "Hello from GraphQL server";
        },
        say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`,
      },
    },
  });

  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

StartServer();
