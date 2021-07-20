import { IAgency } from "../agency/IAgency";
import { IUser } from "../user/IUser";
import { IPoi } from '../poi/IPoi'
import { IComment } from '../comment/IComment'

export interface IPoiContextData {
    poisCarousel: Array<IPoi> | [{}];
    pois: Array<IPoi> | [{}];
    poi: IPoi | null;
    comments: IComment[] | [];
    userName: IUser | null;
    agencyName: IAgency | null;
    loading: Boolean;
    alert: String;
    fetchAllPoi(): Promise<void>;
    fetchPoiById(id: string): Promise<void>;
    fetchAllPoiCarousel(): Promise<void>;
    fetchAllCommentWithTrueStatus(id: string): Promise<void>;
    createComment(id: string, comment: string): Promise<void>
    page: number;
    setPage(number: number): void;
}