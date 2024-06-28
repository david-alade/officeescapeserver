import OpenAI from "openai";
import { Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const prompt = `
You are a concierge. You are given a list of events to do in the area and a list of things a
person is interested in. You are tasked with coming up with a response made of bullet points and insightful
recommendations based on a persons provided interests and their prompt. Your response should be to
the person's interests and some of the events to do in the area. 

Here are the events to choose from:

`;

export const openAiStreamEventResponse = async (
  interests: string,
  res: Response
) => {
  try {
    console.log("Prompting");

    const apiKey = process.env.OPEN_AI_API_KEY;
    const openai = new OpenAI({ apiKey });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: interests,
        },
      ],
      stream: true,
      temperature: 1,
      max_tokens: 4096,
    });

    console.log("Made stream")
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");
    res.flushHeaders();

    for await (const chunk of stream) {
      console.log(chunk.choices[0]?.delta?.content || "");
      res.write(chunk.choices[0]?.delta?.content || "");
      res.flush()
    }

    res.end();
  } catch (error: any) {
    console.error("Error opening stream:", error);
    throw new Error(error.message);
  }
};
