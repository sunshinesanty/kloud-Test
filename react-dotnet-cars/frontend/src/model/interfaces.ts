// tslint:disable:class-name
// tslint:disable:interface-name
export interface ICar {
    brand: string;
    colour: string;
}

export interface ICarOwner {
    name: string;
    cars: ICar[];
}

export interface IError {
    show: boolean;
    message: string;
    onClose: () => void;
}

export interface IOwnerColor {
    name: string;
    colour: string;
}
