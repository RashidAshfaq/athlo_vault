import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { UserRole } from '../roles';

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

export function formatUsersData(user: any) {
  if (user.role === UserRole.ATHLETE) {
    const { athlete, ...usersData } = user || {};
    let cleanAthlete = athlete;
    if (athlete && athlete.user) {
      const { user: _athleteUser, ...athleteRest } = athlete;
      cleanAthlete = athleteRest;
    }
    return {
      userId: user.id,
      ...usersData,
      ...cleanAthlete,
    };
  }
  if(user.user){
     const { user: _athleteUser, ...athleteRest } = user;
     return {
        userId: user.user.id,
        ...user.user,
        ...athleteRest,
     }
  }
}
