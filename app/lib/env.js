import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  throw new Error(`Invalid environment variables: ${error.errors.map(e => e.message).join(', ')}`);
}

export const env = envSchema.parse(process.env);
