import { Entity } from '@loopback/repository';
import { Document } from './document.model';
import { InvoiceItem } from './invoice-item.model';
import { PartnerDetails } from './partner-details.model';
export declare class Invoice extends Entity {
    id?: string;
    supplierIdentifier: string;
    supplierDetails: PartnerDetails;
    clientIdentifier: string;
    clientDetails: PartnerDetails;
    documentIdentifier: string;
    invoiceDate: string;
    items: InvoiceItem[];
    invoiceTotalWithoutTax: number;
    invoiceTotalWithTax: number;
    stampTax: number;
    tvaRate: number;
    totalTva: number;
    totalDiscount: number;
    invoiceTotalinLetters: string;
    document: Document;
    constructor(data?: Partial<Invoice>);
}
export interface InvoiceRelations {
}
export declare type InvoiceWithRelations = Invoice & InvoiceRelations;
