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
    let currentSeasonStats = null;
    if (cleanAthlete?.primarySport) {
      const sport = cleanAthlete.primarySport.toLowerCase();
      switch (sport) {
        case 'football':
          currentSeasonStats = cleanAthlete.footballSeason || null;
          break;
        case 'basketball':
          currentSeasonStats =
            cleanAthlete.basketballSeason || null;
          break;
        case 'swimming':
          currentSeasonStats = cleanAthlete.swimmingSeason || null;
          break;
        case 'soccer':
          currentSeasonStats = cleanAthlete.soccerSeason || null;
          break;
        case 'baseball':
          currentSeasonStats = cleanAthlete.baseballSeason || null;
          break;
        case 'tennis':
          currentSeasonStats = cleanAthlete.tennisSeason || null;
          break;
        case 'golf':
          currentSeasonStats = cleanAthlete.golfSeason || null;
          break;
        case 'track and field':
          currentSeasonStats =
            cleanAthlete.trackAndFieldsSeason || null;
          break;
      }
    }
     const {
      footballSeason,
      basketballSeason,
      swimmingSeason,
      soccerSeason,
      baseballSeason,
      tennisSeason,
      golfSeason,
      trackAndFieldsSeason,
      ...athleteDataWithoutSeasons
    } = cleanAthlete;
    return {
      userId: user.id,
      ...usersData,
      ...athleteDataWithoutSeasons,
      currentSeasonStats,
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
  } else if (user.role === UserRole.ADMIN) {
    const {
      admin,
      athlete: _athlete,
      investor: _investor,
      ...usersData
    } = user || {};
    let cleanAdmin = admin;
    if (admin && admin.user) {
      const { user: _adminUser, ...adminRest } = admin;
      cleanAdmin = adminRest;
    }
    return {
      userId: user.id,
      ...usersData,
      ...cleanAdmin,
    };
  } else if (user.role === UserRole.FAN) {
    const {
      fan,
      athlete: _athlete,
      investor: _investor,
      admin: _admin,
      ...usersData
    } = user || {};
    let cleanFan = fan;
    if (fan && fan.user) {
      const { user: _fanUser, ...fanRest } = fan;
      cleanFan = fanRest;
    }
    return {
      userId: user.id,
      ...usersData,
      ...cleanFan,
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
