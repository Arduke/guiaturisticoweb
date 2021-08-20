import { Favorites, IUser, IUserDto } from "../user/IUser";

export interface IAuthContextData {
  signed: boolean;
  user: string | null;
  loading: Boolean;
  alert: string;
  favorites: Favorites[] | null;
  userInfo: IUser | null;
  getUserInfo(userId: string): Promise<void>;
  setAlert(text: string): any;
  Login(email: string, password: string, callback: Function): Promise<void>;
  LoginWithGoogle(
    email: string,
    password: string,
    username: string,
    picture: string,
    callback: Function
  ): Promise<void>;
  Logout(): Promise<void>;
  Register(user: IUserDto, callback: Function): Promise<void>;
  getFavorites(userId: string): Promise<void>;
  addFavorite(userId: string, poiId: string): Promise<void>;
  removeFavorite(userId: string, poiId: string): Promise<void>;
}
