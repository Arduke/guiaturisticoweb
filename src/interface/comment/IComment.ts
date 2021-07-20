import { IUser } from "../user/IUser";

export interface IComment {
    id: string;
    poiId: string;
    userId: string;
    status: boolean;
    comment: string;
    user: IUser;
    updatedAt: string;
    createdAt: string;
}