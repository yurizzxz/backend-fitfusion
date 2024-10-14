import Fastify from "fastify";
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes';

const app = Fastify({ logger: true });
dotenv.config();

// Handler para capturar e retornar erros
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  // Configurando o CORS para aceitar localhost e a API no Vercel
  app.register(cors, {
    origin: (origin, cb) => {
      // Lista de origens permitidas
      const allowedOrigins = ["http://localhost:3000", "https://backend-fitfusion-ymwv.vercel.app"];
      // Verifica se a origem está permitida
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        cb(null, true);  // Permite a requisição
      } else {
        cb(new Error("Not allowed by CORS")); // Bloqueia origens não permitidas
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Permite cookies e autenticação via credenciais
  });

  // Registrando as rotas
  app.register(routes);

  // Iniciando o servidor
  try {
    await app.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
  }
};

start();
