import { Entity } from '@loopback/repository';
export declare class NgRedirectionUrl extends Entity {
    sucessUrl: string;
    failureUrl: string;
    constructor(data?: Partial<NgRedirectionUrl>);
}
export interface NgRedirectionUrlRelations {
}
export declare type NgRedirectionUrlWithRelations = NgRedirectionUrl & NgRedirectionUrlRelations;
