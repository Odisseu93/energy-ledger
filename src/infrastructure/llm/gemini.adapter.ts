import { GoogleGenAI } from '@google/genai';
import { injectable } from 'tsyringe';

import { ILLMAdapter } from '@/domain/repositories/ILLMAdapter';
import { InvoiceLLMDataDto } from '@/application/dtos/invoice-llm-data.dto';
import { LLMError, LLMParseError } from '@/shared/errors';
import { env } from '@/infrastructure/config/env';
import { logger } from '@/shared/logger/logger';
import { invoiceLLMDataSchema } from './invoice-llm-data.schema';

const EXTRACTION_PROMPT = `
You are a data extractor for Brazilian electricity invoices.
Analyze the provided PDF document and return ONLY a valid JSON object,
no markdown, no explanations.

The JSON must have exactly this structure:
{
  "customer_number": "string",
  "reference_month": "string (format: MMM/YYYY where MMM is Portuguese, e.g.: SET/2024)",
  "electric_energy_kwh": number,
  "electric_energy_value": number,
  "sceee_energy_kwh": number,
  "sceee_energy_value": number,
  "compensated_energy_kwh": number,
  "compensated_energy_value": number,
  "public_lighting_contrib": number
}

Rules:
- All monetary values must be numbers (no R$).
- Negative values must remain negative.
- If a field is not found, use 0.
`;

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

@injectable()
export class GeminiAdapter implements ILLMAdapter {
  private readonly client: GoogleGenAI;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  }

  async extractInvoiceData(buffer: Buffer): Promise<InvoiceLLMDataDto> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await this.callGemini(buffer);
      } catch (error) {
        lastError = error as Error;

        // Do not retry parse errors — bad JSON won't improve on retry
        if (error instanceof LLMParseError) throw error;

        logger.warn({ attempt, error: lastError.message }, 'Gemini call failed, retrying...');

        if (attempt < MAX_RETRIES) {
          await this.delay(BASE_DELAY_MS * Math.pow(2, attempt - 1));
        }
      }
    }

    throw new LLMError(`Gemini API failed after ${MAX_RETRIES} attempts: ${lastError?.message}`);
  }

  private async callGemini(buffer: Buffer): Promise<InvoiceLLMDataDto> {
    let response;

    try {
      response = await this.client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: EXTRACTION_PROMPT },
              {
                inlineData: {
                  mimeType: 'application/pdf',
                  data: buffer.toString('base64'),
                },
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw new LLMError(`Gemini API request failed: ${(error as Error).message}`);
    }

    const raw = response.text ?? '';

    // Gemini may wrap the JSON in markdown fences when system instructions
    // are not enforced via the API config. Strip them before parsing.
    const cleaned = raw
      .replace(/^```(?:json)?\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new LLMParseError(`LLM response is not valid JSON: ${cleaned.slice(0, 200)}`);
    }

    const result = invoiceLLMDataSchema.safeParse(parsed);
    if (!result.success) {
      throw new LLMParseError(
        `LLM response missing required fields: ${JSON.stringify(result.error.flatten().fieldErrors)}`,
      );
    }

    return result.data;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
