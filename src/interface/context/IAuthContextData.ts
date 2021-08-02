import { IPoi } from "../poi/IPoi";
import { IUserDto } from "../user/IUser";

export interface IAuthContextData {
  signed: boolean;
  user: string | null;
  loading: Boolean;
  alert: string;
  favorites: IPoi[] | null;
  setAlert(text: string): any;
  Login(email: string, password: string, callback: Function): Promise<void>;
  Logout(): Promise<void>;
  Register(user: IUserDto, callback: Function): Promise<void>;
  getFavorites(userId: string): Promise<void>;
  addFavorite(userId: string, poiId: string): Promise<void>;
  removeFavorite(userId: string, poiId: string): Promise<void>;
}
