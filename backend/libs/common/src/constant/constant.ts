import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";

export const VALIDATION_PIPE = new ValidationPipe({
  whitelist: true,
  exceptionFactory: (errors) => {
    const formattedErrors = errors.map((err) => ({
      field: err.property,
      constraints: err.constraints,
    }));
    return new UnprocessableEntityException({
      message: 'Validation Failed.',
      errors: formattedErrors,
    });
  },
});


export type Response = {
  success: boolean;
  message: string;
  data: any;
};

export enum GenderType {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}