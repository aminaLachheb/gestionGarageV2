import { Entity } from '@loopback/repository';
import { NgDocument } from './ng-document.model';
import { NgSigner } from './ng-signer.model';
import { NgUser } from './ng-user.model';
export declare class NgTransaction extends Entity {
    uuid: string;
    puuid: string;
    creationDate: string;
    status: string;
    digestAlgo: string;
    signingTime: string;
    creator: NgUser;
    nextSigner: string;
    parallelSignatures: boolean;
    byApi: boolean;
    lockDate: string;
    lockingSigner: string;
    signers: NgSigner[];
    observers: NgUser[];
    pdfs: NgDocument[];
    constructor(data?: Partial<NgTransaction>);
}
export interface NgTransactionRelations {
}
export declare type NgTransactionWithRelations = NgTransaction & NgTransactionRelations;
