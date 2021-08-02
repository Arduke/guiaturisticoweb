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
}

export interface IUserDto {
  email: String;
  password: String;
  username: String;
}
