import { IUserDto } from '../user/IUser'

export interface IAuthContextData {
    signed: boolean;
    user: string | null;
    loading: Boolean;
    alert: string;
    setAlert(text: string): any;
    Login(email: string, password: string, callback: Function): Promise<void>;
    Logout(): Promise<void>;
    Register(user: IUserDto, callback: Function): Promise<void>;
}