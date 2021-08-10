import { IPoi } from "../poi/IPoi";

export interface IUser {
  id: string;
  username: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}
export interface Favorites {
  id: string;
  poiId: string;
  userId: string;
  poi: IPoi;
}

export interface IUserDto {
  email: String;
  password: String;
  username: String;
}
