"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.API_KEY;

const systemMessage = `
  Your name is ContentAssist. 
  You are a chatbot that answers only about content creation. 
  If the user says "hey" or similar words, respond to that. 
  Always read the user input carefully and provide a perfect answer only related to content creation.
`;

const google = createGoogleGenerativeAI({
  apiKey: apiKey,
});

export async function getWorkouts(generation) {
  "use server";

  const messages = [
    { role: "system", content: systemMessage },
    { role: "user", content: generation },
  ];

  const { object: workout } = await generateObject({
    model: google("gemini-1.5-flash"),
    messages: messages,
    schema: z.array(
      z.object({
        workout_name: z.string(),
        Description_of_workout: z.string(),
      })
    ),
  });

  return { workout };
}
