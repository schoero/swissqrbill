import { ValidationError } from "swissqrbill:errors";


export function getValidationError(fn: (...params: unknown[]) => unknown): ValidationError | undefined {
  try {
    fn();
  } catch (error){
    if(error instanceof ValidationError){
      return error;
    }
  }
}
