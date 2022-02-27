import {Entity, model, property} from '@loopback/repository';
import {InvoiceItem} from './invoice-item.model';
import {PartnerDetails} from './partner-details.model';

@model()
export class InvoiceTief extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  supplierIdentifier: string;

  @property({
    type: 'object',
    required: true,
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
    type: 'date',
    required: true,
  })
  invoiceDate: Date;

  @property({
    type: 'array',
    itemType: InvoiceItem,
    required: true,
  })
  items: InvoiceItem[];

  @property({
    type: 'number',
    required: true,
  })
  invoiceTotalWithoutTax: number;

  @property({
    type: 'number',
    required: true,
  })
  invoiceTotalWithTax: number;

  @property({
    type: 'number',
    required: true,
  })
  invoiceTotalTax: number;

  @property({
    type: 'string',
    required: true,
  })
  invoiceTotalinLetters: string;

  @property({
    type: 'number',
    required: true,
  })
  stampTax: number;

  @property({
    type: 'number',
    required: true,
  })
  tvaRate: number;

  @property({
    type: 'number',
    required: true,
  })
  tvaTax: number;

  @property({
    type: 'number',
    required: true,
  })
  totalDiscount: number;


  constructor(data?: Partial<InvoiceTief>) {
    super(data);
  }
}

export interface InvoiceTiefRelations {
  // describe navigational properties here
}

export type InvoiceTiefWithRelations = InvoiceTief & InvoiceTiefRelations;
