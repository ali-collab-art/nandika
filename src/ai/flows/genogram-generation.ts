'use server';

/**
 * @fileOverview Genogram generation flow for visualizing family relationships.
 *
 * - generateGenogram - A function that handles the genogram generation process.
 * - GenogramInput - The input type for the generateGenogram function.
 * - GenogramOutput - The return type for the generateGenogram function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenogramInputSchema = z.object({
  familyData: z
    .string()
    .describe(
      'Structured family data, must be a valid JSON that can be parsed into an array of family member objects. Each family member object should include details such as name, gender, birth date, relationships, etc.'
    ),
});
export type GenogramInput = z.infer<typeof GenogramInputSchema>;

const GenogramOutputSchema = z.object({
  genogramVisualization: z
    .string()
    .describe(
      'A textual or visual representation of the genogram, suitable for display in a user interface. If possible, provide the data URI of the generated image.'
    ),
});
export type GenogramOutput = z.infer<typeof GenogramOutputSchema>;

export async function generateGenogram(input: GenogramInput): Promise<GenogramOutput> {
  return genogramGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'genogramGenerationPrompt',
  input: {schema: GenogramInputSchema},
  output: {schema: GenogramOutputSchema},
  prompt: `You are an AI assistant specialized in generating genograms, which are visual representations of family relationships and medical history.

  Given the following structured family data, create a genogram visualization. The genogram should clearly depict family members, their relationships, and any relevant medical or genetic information, using standard genogram symbols and conventions.

  Family Data:
  {{familyData}}

  If you cannot generate a visual representation, you can use a text format like mermaid.js to render the genogram.
  If you can, provide a data URI for the generated image.
  `,
});

const genogramGenerationFlow = ai.defineFlow(
  {
    name: 'genogramGenerationFlow',
    inputSchema: GenogramInputSchema,
    outputSchema: GenogramOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
