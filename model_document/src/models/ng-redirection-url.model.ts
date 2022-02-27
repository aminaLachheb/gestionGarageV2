import {Entity, model, property} from '@loopback/repository';

@model()
export class NgRedirectionUrl extends Entity {
  @property({
    type: 'string',
  })
  sucessUrl: string;

  @property({
    type: 'string',
  })
  failureUrl: string;


  constructor(data?: Partial<NgRedirectionUrl>) {
    super(data);
  }
}

export interface NgRedirectionUrlRelations {
  // describe navigational properties here
}

export type NgRedirectionUrlWithRelations = NgRedirectionUrl & NgRedirectionUrlRelations;
