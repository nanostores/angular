import { atom, type WritableAtom } from "nanostores";

export type IUser = {
  id: string;
  name: string;
  updatedAt: number;
};

const userCache: Record<string, WritableAtom<IUser>> = {};

export const User = (id: string) => {
  if (!userCache[id]) {
    userCache[id] = atom<IUser>({
      id,
      name: "New User",
      updatedAt: Date.now(),
    });
  }

  return userCache[id];
};
