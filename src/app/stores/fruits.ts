import { atom } from 'nanostores';

export type Fruit = {
  name: string;
  cost: number;
}

export const fruits = atom<Fruit[]>([])
