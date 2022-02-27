import { Entity } from '@loopback/repository';
import { NgSignerConfiguration } from './ng-signer-configuration.model';
import { NgUser } from './ng-user.model';
export declare class NgSignatureConfiguration extends Entity {
    signConf: NgSignerConfiguration;
    observers: NgUser;
    lang: string;
    parallelSignatures: boolean;
    constructor(data?: Partial<NgSignatureConfiguration>);
}
export interface NgSignatureConfigurationRelations {
}
export declare type NgSignatureConfigurationWithRelations = NgSignatureConfiguration & NgSignatureConfigurationRelations;
