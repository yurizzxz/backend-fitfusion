import { DataProps } from '../controllers/CreateNutritionController';
import { GoogleGenerativeAI } from '@google/generative-ai';

class CreateNutritionService {
  async execute({ name, age, gender, height, level, objective, weight }: DataProps) {
    try {
  
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found');
      }
      const genAI = new GoogleGenerativeAI('AIzaSyBgvFl2Cn7ks4l17FgxP9IJUx_2KzTLYnM')
      const model = genAI.getGenerativeModel({ model: "gemini" });

      const response = await model.generateContent(`
        Crie uma dieta completa para uma pessoa chamada ${name}, do sexo ${gender}, com peso atual de ${weight}kg, altura de ${height}m, idade de ${age} anos, com foco em ${objective}. A pessoa tem um nível de atividade ${level}. Para a dieta:

        - Inclua alimentos acessíveis no Brasil, como arroz, feijão, carne, legumes, verduras, frutas e ovos.
        - Forneça quantidades recomendadas em gramas ou mililitros para cada alimento.
        - Distribua as refeições em 6 períodos: café da manhã, lanche da manhã, almoço, lanche da tarde, jantar, e ceia.
        - Para hipertrofia: priorize alta ingestão proteica (peito de frango, ovos, carne vermelha magra), carboidratos complexos (arroz integral, batata-doce), e gorduras saudáveis (castanhas, azeite).
        - Para emagrecimento: reduza calorias, inclua fibras (frutas, verduras) e proteínas magras (peixe, frango, ovos).
        - Indique calorias totais por dia e para cada refeição.
        - Use alimentos naturais e minimamente processados.
        - Inclua sugestões de suplementos, como whey protein para hipertrofia ou termogênicos para emagrecimento.
      `);

      if (response?.candidates?.[0]?.content?.text) {
        const jsonText = response.candidates[0].content.text;      

        let jsonString = jsonText.replace(/\`\`\w*\n/g, ''); 
        jsonString = jsonString.trim();


        try {
          const jsonObject = JSON.parse(jsonString);
          return jsonObject;
        } catch (jsonError) {
          console.error('Erro ao analisar JSON:', jsonError);
          throw new Error('Erro ao analisar conteúdo JSON retornado');
        }
      } else {
        console.error('Nenhum candidato encontrado na resposta');
        throw new Error('Nenhum conteúdo gerado pela IA');
      }

    } catch (err) {
      console.error('Erro:', err);
      throw new Error('Falha ao criar dieta personalizada');
    }
  }
}

export { CreateNutritionService };







