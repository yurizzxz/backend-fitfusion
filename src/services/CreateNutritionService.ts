import { DataProps } from '../controllers/CreateNutritionController'
import { GoogleGenerativeAI } from '@google/generative-ai'

class CreateNutritionService {
  async execute({ name, age, gender, height, level, objective, weight }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyBgvFl2Cn7ks4l17FgxP9IJUx_2KzTLYnM')
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const response = await model.generateContent(`Crie uma dieta completa para uma pessoa chamada ${name}, do sexo ${gender}, com peso atual de ${weight}kg, altura de ${height}m, idade de ${age} anos, com foco em ${objective}. A pessoa tem um nível de atividade ${level}. Para a dieta:

        - Inclua alimentos acessíveis no Brasil, como arroz, feijão, carne, legumes, verduras, frutas e ovos.
        - Forneça quantidades recomendadas em gramas ou mililitros para cada alimento.
        - Distribua as refeições em 6 períodos: café da manhã, lanche da manhã, almoço, lanche da tarde, jantar, e ceia.
        - Para hipertrofia: priorize alta ingestão proteica (peito de frango, ovos, carne vermelha magra), carboidratos complexos (arroz integral, batata-doce), e gorduras saudáveis (castanhas, azeite).
        - Para emagrecimento: reduza calorias, inclua fibras (frutas, verduras) e proteínas magras (peixe, frango, ovos).
        - Indique calorias totais por dia e para cada refeição.
        - Use alimentos naturais e minimamente processados.
        - Inclua sugestões de suplementos, como whey protein para hipertrofia ou termogênicos para emagrecimento.

        Retorne as informações em JSON com as seguintes propriedades: 
        - 'nome'
        - 'sexo'
        - 'idade'
        - 'altura'
        - 'peso'
        - 'objetivo'
        - 'nivel_atividade'
        - 'refeicoes', onde 'refeicoes' é um array com objetos. Cada objeto contém: 'horario', 'nome', 'alimentos' (array de alimentos e suas quantidades), e 'calorias'. Não use acentos no JSON.`)

      console.log(JSON.stringify(response, null, 2))

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0].text as string

        // Extrair o JSON
        let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim()

        let jsonObject = JSON.parse(jsonString)

        return { data: jsonObject }
      }

    } catch (err) {
      console.error("Erro JSON: ", err)
      throw new Error("Failed to create.")
    }
  }
}

export { CreateNutritionService }

