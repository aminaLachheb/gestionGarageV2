import { Entity } from '@loopback/repository';
export declare class NgDocument extends Entity {
    size: number;
    name: string;
    extension: string;
    identifier: string;
    pdfA: boolean;
    constructor(data?: Partial<NgDocument>);
}
export interface NgDocumentRelations {
}
export declare type NgDocumentWithRelations = NgDocument & NgDocumentRelations;
