import { User } from '../../users/interfaces/user';

export interface Area {
  _id?: string;
  name: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  address?: string;
  visibility?: number;
  creator?: string;
  distance?: number;
  mine?: boolean;
}

export interface AreasResponse {
  areas: Area[];
}

export interface AreaResponse {
  area: Area;
}
