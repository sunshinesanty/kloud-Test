// tslint:disable:class-name
export interface ICar {
    brand: string;
    colour: string;
}

export interface ICarOwner {
    name: string;
    cars: ICar[];
}
