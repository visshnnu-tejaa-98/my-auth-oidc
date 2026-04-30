import * as z from "zod";
import { ZodIssue } from "zod";

class BaseDto {
  static schema: z.ZodTypeAny = z.object({});

  static async validate<T>(
    data: T,
  ): Promise<{ value: T; error: ZodIssue[] | null }> {
    const parsedResult = await this.schema.safeParseAsync(data);
    if (parsedResult.success) {
      return { value: parsedResult.data as T, error: null };
    } else {
      return { value: null as T, error: parsedResult.error.issues };
    }
  }
}

export default BaseDto;
