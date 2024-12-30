import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateNutritionService } from '../services/CreateNutritionService';


export interface DataProps {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
}

class CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      
      const { name, weight, height, age, gender, objective, level } = request.body as DataProps;
      
      if (!name || !weight || !height || !age || !gender || !objective || !level) {
        return reply.status(400).send({ message: 'Todos os campos são obrigatórios.' });
      }
      const createNutrition = new CreateNutritionService();
      
      const nutrition = await createNutrition.execute({
        name,
        weight,
        height,
        age,
        gender,
        objective,
        level,
      });

      
      return reply.send(nutrition);
    } catch (err) {
     
      console.error('Erro ao criar dieta:', err);
      return reply.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
}

export { CreateNutritionController };
