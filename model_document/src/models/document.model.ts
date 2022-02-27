import {Entity, model, property} from '@loopback/repository';

@model()
export class Document extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  identifier?: string;

  @property({
    type: 'number',
    required: true,

  })
  id: number;


  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  extension: string;

  @property({
    type: 'string',
    required: true,
  })
  etat: string;

  @property({
    type: 'string',
    required: true,
  })
  module: string;


  @property({
    type: 'number',
    required: true,
  })
  size: number;

  @property({
    type: 'string',
  })
  invoiceId?: string;

  constructor(data?: Partial<Document>) {
    super(data);
  }
}

export interface DocumentRelations {
  // describe navigational properties here
}

export type DocumentWithRelations = Document & DocumentRelations;
