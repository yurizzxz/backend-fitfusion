import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify';
import { CreateNutritionController } from './controllers/CreateNutritionController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  function generateDietJSON() {
    return {
      nome: "Yuri",
      sexo: "Masculino",
      idade: 17,
      altura: 1.73,
      peso: 68,
      objetivo: "Hipertrofia",
      refeicoes: [
        {
          horario: "08:00",
          nome: "Café da Manhã",
          alimentos: [
            { nome: "Pão francês com manteiga", quantidade: "2 fatias" },
            { nome: "Ovos cozidos ou mexidos", quantidade: "2 unidades" },
            { nome: "Banana", quantidade: "1 unidade" },
            { nome: "Leite", quantidade: "200ml" },
            { nome: "Queijo", quantidade: "1 fatia" },
            { nome: "Café preto", quantidade: "1 xícara" }
          ],
          calorias: 400
        },
        {
          horario: "10:00",
          nome: "Lanche da Manhã",
          alimentos: [
            { nome: "Iogurte natural", quantidade: "1 unidade" },
            { nome: "Pão integral com requeijão", quantidade: "1 fatia" },
            { nome: "Maçã", quantidade: "1 unidade" },
            { nome: "Castanhas ou amendoim", quantidade: "1 punhado" }
          ],
          calorias: 250
        },
        {
          horario: "13:00",
          nome: "Almoço",
          alimentos: [
            { nome: "Frango grelhado ou cozido", quantidade: "150g" },
            { nome: "Arroz", quantidade: "1 xícara" },
            { nome: "Feijão", quantidade: "1 xícara" },
            { nome: "Brócolis ou couve refogada", quantidade: "1 xícara" },
            { nome: "Salada de alface e tomate", quantidade: "à vontade" },
            { nome: "Batata cozida", quantidade: "1 unidade" }
          ],
          calorias: 600
        },
        {
          horario: "16:00",
          nome: "Lanche da Tarde",
          alimentos: [
            { nome: "Pão com queijo e presunto", quantidade: "1 fatia" },
            { nome: "Banana", quantidade: "1 unidade" },
            { nome: "Bolacha cream cracker", quantidade: "1 unidade" },
            { nome: "Suco de laranja", quantidade: "1 copo" }
          ],
          calorias: 300
        },
        {
          horario: "20:00",
          nome: "Jantar",
          alimentos: [
            { nome: "Carne moída ou frango", quantidade: "150g" },
            { nome: "Arroz", quantidade: "1 xícara" },
            { nome: "Legumes cozidos (cenoura, abobrinha)", quantidade: "1 xícara" },
            { nome: "Salada de repolho e cenoura", quantidade: "à vontade" },
            { nome: "Abacate", quantidade: "1 fatia" }
          ],
          calorias: 500
        },
        {
          horario: "22:00",
          nome: "Lanche da Noite",
          alimentos: [
            { nome: "Leite com achocolatado", quantidade: "200ml" },
            { nome: "Pão com manteiga", quantidade: "1 fatia" },
            { nome: "Frutas da estação", quantidade: "1 porção" }
          ],
          calorias: 200
        }
      ],
      suplementos: [
        { nome: "Whey Protein", dosagem: "30g após treino" },
        { nome: "Creatina", dosagem: "5g por dia" }
      ],
      calorias_totais: 2250,
      macros: {
        proteinas: "150g",
        carboidratos: "250g",
        gorduras: "70g"
      }
    };
  }

  fastify.get('/form', (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const diet = generateDietJSON();
      return reply.send({ data: diet });
    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: "Erro ao gerar a dieta." });
    }
  });

  fastify.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateNutritionController().handle(request, reply);
  });
}
