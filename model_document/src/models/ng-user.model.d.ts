import { Entity } from '@loopback/repository';
export declare class NgUser extends Entity {
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    completeName: string;
    constructor(data?: Partial<NgUser>);
}
export interface NgUserRelations {
}
export declare type NgUserWithRelations = NgUser & NgUserRelations;
