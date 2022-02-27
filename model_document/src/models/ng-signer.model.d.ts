import { Entity } from '@loopback/repository';
import { NgUser } from './ng-user.model';
export declare class NgSigner extends Entity {
    signer: NgUser;
    status: string;
    type: string;
    mode: string;
    signingTime: string;
    otp: string;
    constructor(data?: Partial<NgSigner>);
}
export interface NgSignerRelations {
}
export declare type NgSignerWithRelations = NgSigner & NgSignerRelations;
