import {Entity, model, property} from '@loopback/repository';
import {NgUser} from './ng-user.model';

@model()
export class NgSigner extends Entity {
  @property({
    type: 'object',
  })
  signer: NgUser;

  @property({
    type: 'string',
  })
  status: string;

  @property({
    type: 'string',
  })
  type: string;

  @property({
    type: 'string',
  })
  mode: string;

  @property({
    type: 'date',
  })
  signingTime: string;

  @property({
    type: 'string',
  })
  otp: string;


  constructor(data?: Partial<NgSigner>) {
    super(data);
  }
}

export interface NgSignerRelations {
  // describe navigational properties here
}

export type NgSignerWithRelations = NgSigner & NgSignerRelations;
