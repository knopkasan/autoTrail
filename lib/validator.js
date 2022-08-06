import SwaggerParser from '@apidevtools/swagger-parser';
import Ajv from 'ajv';

export async function loadApispec(path) {
  return SwaggerParser.dereference(path);
}

export function validate(schema, body) {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false,
  });
  const validate = ajv.compile(schema);
  const valid = validate(body);

  if (!valid) {
    throw new Error(`Error: ${JSON.stringify({
      validationErrors: validate.errors,
    }, null, 2)}`);
  }
}
