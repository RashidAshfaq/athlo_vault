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
  } else if (user.user) {
    const { user: _athleteUser, ...athleteRest } = user;
    return {
      userId: user.user.id,
      ...user.user,
      ...athleteRest,
    };
  } else if (user.role === UserRole.INVESTOR) {
    const { investor, athlete: _athlete, ...usersData } = user || {};
    let cleanInvestor = investor;
    if (investor && investor.user) {
      const { user: _investorUser, ...investorRest } = investor;
      cleanInvestor = investorRest;
    }
    return {
      userId: user.id,
      ...usersData,
      ...cleanInvestor,
    };
  }
}

export function formatProfile(data: any) {
  const { user, ...profileData } = data;
  const {
    id: userId,
    firstName,
    lastName,
    accountType,
    profile_picture,
    city,
    state,
    country,
    zip,
    role,
    email,
    isApproved,
    isProfileCompleted,
  } = user || {};
  return {
    userId,
    firstName,
    lastName,
    accountType,
    profile_picture,
    city,
    state,
    country,
    zip,
    role,
    email,
    isApproved,
    isProfileCompleted,
    ...profileData,
  };
}
