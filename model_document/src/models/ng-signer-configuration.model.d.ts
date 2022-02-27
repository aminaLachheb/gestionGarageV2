import { Entity } from '@loopback/repository';
import { NgDocumentConfig } from './ng-document-config.model';
import { NgRedirectionUrl } from './ng-redirection-url.model';
export declare class NgSignerConfiguration extends Entity {
    signer: object;
    sigType: string;
    mode: string;
    otp: string;
    docsConfigs: NgDocumentConfig;
    receiveDocument: boolean;
    redirectionUrl: NgRedirectionUrl;
    constructor(data?: Partial<NgSignerConfiguration>);
}
export interface NgSignerConfigurationRelations {
}
export declare type NgSignerConfigurationWithRelations = NgSignerConfiguration & NgSignerConfigurationRelations;
