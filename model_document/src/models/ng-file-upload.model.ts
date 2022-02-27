import {Entity, model, property} from '@loopback/repository';

@model()
export class NgFileUpload extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fileName: string;

  @property({
    type: 'string',
    required: true,
  })
  fileExtension: string;

  @property({
    type: 'string',
  })
  fileBase64: string;


  constructor(data?: Partial<NgFileUpload>) {
    super(data);
  }
}

export interface NgFileUploadRelations {
  // describe navigational properties here
}

export type NgFileUploadWithRelations = NgFileUpload & NgFileUploadRelations;
