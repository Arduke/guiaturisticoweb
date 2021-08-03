import { ICategory } from "../category/ICategory";

export interface IPoi {
    address: string;
    agencyId: string;
    categories: ICategory[];
    createdAt: string;
    updatedAt: string;
    description: string;
    lat: number;
    lng: number;
    id: string;
    name: string;
    picture: string;
}