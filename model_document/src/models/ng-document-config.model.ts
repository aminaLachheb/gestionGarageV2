import {Entity, model, property} from '@loopback/repository';

@model()
export class NgDocumentConfig extends Entity {
  @property({
    type: 'number',
  })
  page: number;

  @property({
    type: 'number',
  })
  xAxis: number;

  @property({
    type: 'number',
  })
  yAxis: number;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  identifier: string;


  constructor(data?: Partial<NgDocumentConfig>) {
    super(data);
  }
}

export interface NgDocumentConfigRelations {
  // describe navigational properties here
}

export type NgDocumentConfigWithRelations = NgDocumentConfig & NgDocumentConfigRelations;
