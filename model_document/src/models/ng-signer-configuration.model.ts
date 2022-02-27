import {Entity, model, property} from '@loopback/repository';
import {NgDocumentConfig} from './ng-document-config.model';
import {NgRedirectionUrl} from './ng-redirection-url.model';

@model()
export class NgSignerConfiguration extends Entity {
  @property({
    type: 'object',
  })
  signer: object;

  @property({
    type: 'string',
  })
  sigType: string;

  @property({
    type: 'string',
  })
  mode: string;

  @property({
    type: 'string',
  })
  otp: string;

  @property({
    type: 'object',
  })
  docsConfigs: NgDocumentConfig;

  @property({
    type: 'boolean',
  })
  receiveDocument: boolean;

  @property({
    type: 'object',
  })
  redirectionUrl: NgRedirectionUrl;


  constructor(data?: Partial<NgSignerConfiguration>) {
    super(data);
  }
}

export interface NgSignerConfigurationRelations {
  // describe navigational properties here
}

export type NgSignerConfigurationWithRelations = NgSignerConfiguration & NgSignerConfigurationRelations;
