import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);


const BASE_QUESTION = 'explain to a first grader this paragraph in no longer than four sentences \n';

export async function callGpt(text: string) {
    const messages = [
            { role: "user", content: `${BASE_QUESTION} ${text}` }
        ]
     
    const response = await openai.createChatCompletion({
        //@ts-ignore
      messages,
      model: "gpt-3.5-turbo",
    });
    
    const botMessage = response.data.choices[0].message;
    return botMessage;
}