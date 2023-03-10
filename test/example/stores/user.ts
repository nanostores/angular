import { mapTemplate } from 'nanostores';

export type IUser = {
  id: string;
  name: string;
  updatedAt: number;
};

export const User = mapTemplate<IUser>((newPost) => {
  newPost.setKey('name', 'New User')
  newPost.setKey('updatedAt', Date.now())
})