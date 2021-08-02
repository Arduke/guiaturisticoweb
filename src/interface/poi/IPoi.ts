import { ICategory } from "../category/ICategory";

export interface IPoi {
  id: string;
  name: string;
  agencyId: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  picture: string;
  categories: ICategory[];
  createdAt: string;
  updatedAt: string;
}
