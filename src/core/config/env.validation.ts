import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

// const variables: ClassConstructor<unknown>[] = [
//   AppConfigVariables,
//   DatabaseConfigVariables,
// ];

// export function validate(config: Record<string, unknown>) {
//   return variables.reduce((result, variable) => {

//   }, {});
// }

export function validateConfigEnv<T>(variable: ClassConstructor<T>) {
  const config = plainToInstance(variable, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  }) as object;

  const errors = validateSync(config, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config as T;
}
