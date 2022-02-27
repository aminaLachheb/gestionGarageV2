import { Entity } from '@loopback/repository';
import { Addresse } from './address.model';
export declare class PartnerDetails extends Entity {
    partnerIdentifier: string;
    partnerName: string;
    rib: string;
    formeJuridique: string;
    rc: string;
    codeTVA: string;
    address: Addresse;
    site: string;
    tel: string;
    fax: string;
    partnerReference: string;
    constructor(data?: Partial<PartnerDetails>);
}
export interface PartnerDetailsRelations {
}
export declare type PartnerDetailsWithRelations = PartnerDetails & PartnerDetailsRelations;
