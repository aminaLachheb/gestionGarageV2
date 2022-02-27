import {Entity, model, property} from '@loopback/repository';
import {NgSignerConfiguration} from './ng-signer-configuration.model';
import {NgUser} from './ng-user.model';

@model()
export class NgSignatureConfiguration extends Entity {
  @property({
    type: 'object',
  })
  signConf: NgSignerConfiguration;

  @property({
    type: 'object',
  })
  observers: NgUser;

  @property({
    type: 'string',
    required: true,
  })
  lang: string;

  @property({
    type: 'boolean',
  })
  parallelSignatures: boolean;


  constructor(data?: Partial<NgSignatureConfiguration>) {
    super(data);
  }
}

export interface NgSignatureConfigurationRelations {
  // describe navigational properties here
}

export type NgSignatureConfigurationWithRelations = NgSignatureConfiguration & NgSignatureConfigurationRelations;
