export const hasValidation = (valid: boolean | undefined) =>
  valid !== undefined;

export const validationStyle = (
  valid: boolean | undefined,
  validStl: string,
  invalidStl: string
): string => (hasValidation(valid) ? (valid ? validStl : invalidStl) : "");
