import {Entity, model, property} from '@loopback/repository';

@model()
export class InvoiceItem extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  ref: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  PU: number;

  @property({
    type: 'number'
  })
  montantHT: number;


  @property({
    type: 'string',
    required: true,
  })
  tvaRate: string;


  constructor(data?: Partial<InvoiceItem>) {
    super(data);
  }
}

export interface InvoiceItemRelations {
  // describe navigational properties here
}

export type InvoiceItemWithRelations = InvoiceItem & InvoiceItemRelations;
