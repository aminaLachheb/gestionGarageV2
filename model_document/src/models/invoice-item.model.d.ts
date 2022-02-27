import { Entity } from '@loopback/repository';
export declare class InvoiceItem extends Entity {
    ref: string;
    description: string;
    name: string;
    code: string;
    quantity: number;
    PU: number;
    montantHT: number;
    tvaRate: string;
    constructor(data?: Partial<InvoiceItem>);
}
export interface InvoiceItemRelations {
}
export declare type InvoiceItemWithRelations = InvoiceItem & InvoiceItemRelations;
