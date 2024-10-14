import Fastify from "fastify";
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes';

const app = Fastify({ logger: true });
dotenv.config();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors, async (instance) => {
    return {
      origin: ['http://localhost:8081', 'https://backend-fitfusion-ymwv.vercel.app'],
      methods: ['GET', 'POST'],  
      credentials: true         
    };
  });

  app.register(routes);

  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log(`Servidor rodando no http://localhost:3000`);
  } catch (err) {
    console.log(err);
  }
};

start();
