import { IUserDto } from '../user/IUser'

export interface IAuthContextData {
    signed: boolean;
    user: String | null;
    loading: Boolean;
    alert: String;
    setAlert(text: String): any;
    Login(email: String, password: String, callback: Function): Promise<void>;
    Logout(): Promise<void>;
    Register(user: IUserDto, callback: Function): Promise<void>;
}