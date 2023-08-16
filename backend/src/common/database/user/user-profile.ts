import { UserAuthType } from './user.auth.type';

export type UserProfile = {
  name: string;
  email: string;
  authType: UserAuthType;
};
