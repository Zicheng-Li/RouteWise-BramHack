import { Car } from "./car";

export interface Route{
	name: string;
	car : Car;
	cost : number;
	distance : number;
	emission : number;
	frequency : number[];
	from : string;
	to : string;
}