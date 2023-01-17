import { map } from 'nanostores';

export interface ProfileValue {
  name: string,
  email?: string
};

export const profile = map<ProfileValue>({
  name: 'anonymous'
});
