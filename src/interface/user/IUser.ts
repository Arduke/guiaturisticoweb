export interface IUser {
    id: string;
    username: string;
    email: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserDto {
    email: String;
    password: String;
    username: String;
}