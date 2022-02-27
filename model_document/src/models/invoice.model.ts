import {Entity, hasOne, model, property} from '@loopback/repository';
import {Document} from './document.model';
import {InvoiceItem} from './invoice-item.model';
import {PartnerDetails} from './partner-details.model';

@model()
export class Invoice extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  supplierIdentifier: string;

  @property({
    type: 'object',
  })
  supplierDetails: PartnerDetails;

  @property({
    type: 'string',
    required: true,
  })
  clientIdentifier: string;

  @property({
    type: 'object',
    required: true,
  })
  clientDetails: PartnerDetails;

  @property({
    type: 'string',
    required: true,
  })
  documentIdentifier: string;

  @property({
    type: 'string',
    required: true,
  })
  invoiceDate: string;

  @property({
    type: 'array',
    itemType: InvoiceItem,
    required: true,
  })
  items: InvoiceItem[];

  @property({
    type: 'number',
  })
  invoiceTotalWithoutTax: number;

  @property({
    type: 'number',
  })
  invoiceTotalWithTax: number;

  @property({
    type: 'number',
  })
  stampTax: number;

  @property({
    type: 'number',
    required: true,
  })
  tvaRate: number;

  @property({
    type: 'number',
  })
  totalTva: number;

  @property({
    type: 'number',
    required: true,
  })
  totalDiscount: number;

  @property({
    type: 'string'
  })
  invoiceTotalinLetters: string;

  @hasOne(() => Document)
  document: Document;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
