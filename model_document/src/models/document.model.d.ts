import { Entity } from '@loopback/repository';
export declare class Document extends Entity {
    identifier?: string;
    id: number;
    name: string;
    extension: string;
    etat: string;
    module: string;
    size: number;
    invoiceId?: string;
    constructor(data?: Partial<Document>);
}
export interface DocumentRelations {
}
export declare type DocumentWithRelations = Document & DocumentRelations;
