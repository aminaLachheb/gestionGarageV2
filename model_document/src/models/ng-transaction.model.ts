import {Entity, model, property} from '@loopback/repository';
import {NgDocument} from './ng-document.model';
import {NgSigner} from './ng-signer.model';
import {NgUser} from './ng-user.model';

@model()
export class NgTransaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  uuid: string;

  @property({
    type: 'date',
  })
  puuid: string;

  @property({
    type: 'date',
  })
  creationDate: string;

  @property({
    type: 'string',
  })
  status: string;

  @property({
    type: 'string',
  })
  digestAlgo: string;

  @property({
    type: 'date',
  })
  signingTime: string;

  @property({
    type: 'object',
  })
  creator: NgUser;

  @property({
    type: 'string',
  })
  nextSigner: string;

  @property({
    type: 'boolean',
  })
  parallelSignatures: boolean;

  @property({
    type: 'boolean',
  })
  byApi: boolean;

  @property({
    type: 'date',
  })
  lockDate: string;

  @property({
    type: 'string',
  })
  lockingSigner: string;

  @property({
    type: 'array',
    itemType: NgSigner,
  })
  signers: NgSigner[];

  @property({
    type: 'array',
    itemType: NgUser,
  })
  observers: NgUser[];

  @property({
    type: 'array',
    itemType: NgDocument,
  })
  pdfs: NgDocument[];

  constructor(data?: Partial<NgTransaction>) {
    super(data);
  }
}

export interface NgTransactionRelations {
  // describe navigational properties here
}

export type NgTransactionWithRelations = NgTransaction & NgTransactionRelations;
