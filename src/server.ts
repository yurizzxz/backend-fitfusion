import Fastify from "fastify";
import cors from "fastify-cors";
import dotenv from 'dotenv';
import { routes } from './routes';

const app = Fastify({ logger: true });
dotenv.config();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  
  app.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = ["http://localhost:8082", "https://backend-fitfusion-ymwv.vercel.app"];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  });

  // Registrando as rotas
  app.register(routes);

  try {
    await app.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
  }
};

start();
