import { Entity } from '@loopback/repository';
export declare class Addresse extends Entity {
    description: string;
    street: string;
    cityName: string;
    cityCode: string;
    country: string;
    constructor(data?: Partial<Addresse>);
}
export interface AddresseRelations {
}
export declare type AddressWithRelations = Addresse & AddresseRelations;
