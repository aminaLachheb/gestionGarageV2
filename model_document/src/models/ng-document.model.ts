import {Entity, model, property} from '@loopback/repository';

@model()
export class NgDocument extends Entity {
  @property({
    type: 'number',
  })
  size: number;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  extension: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  identifier: string;

  @property({
    type: 'boolean',
  })
  pdfA: boolean;


  constructor(data?: Partial<NgDocument>) {
    super(data);
  }
}

export interface NgDocumentRelations {
  // describe navigational properties here
}

export type NgDocumentWithRelations = NgDocument & NgDocumentRelations;
