import { Entity } from '@loopback/repository';
import { InvoiceItem } from './invoice-item.model';
import { PartnerDetails } from './partner-details.model';
export declare class InvoiceTief extends Entity {
    supplierIdentifier: string;
    supplierDetails: PartnerDetails;
    clientIdentifier: string;
    clientDetails: PartnerDetails;
    documentIdentifier: string;
    invoiceDate: Date;
    items: InvoiceItem[];
    invoiceTotalWithoutTax: number;
    invoiceTotalWithTax: number;
    invoiceTotalTax: number;
    invoiceTotalinLetters: string;
    stampTax: number;
    tvaRate: number;
    tvaTax: number;
    totalDiscount: number;
    constructor(data?: Partial<InvoiceTief>);
}
export interface InvoiceTiefRelations {
}
export declare type InvoiceTiefWithRelations = InvoiceTief & InvoiceTiefRelations;
