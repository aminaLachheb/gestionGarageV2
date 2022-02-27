import { Entity } from '@loopback/repository';
export declare class NgDocumentConfig extends Entity {
    page: number;
    xAxis: number;
    yAxis: number;
    identifier: string;
    constructor(data?: Partial<NgDocumentConfig>);
}
export interface NgDocumentConfigRelations {
}
export declare type NgDocumentConfigWithRelations = NgDocumentConfig & NgDocumentConfigRelations;
