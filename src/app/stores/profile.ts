import { atom } from 'nanostores';

export const profile = atom<{
  userId: string;
  name: string;
}>({ userId: '0', name: 'John'})
