import { Entity } from '@loopback/repository';
import { Addresse } from './address.model';
export declare class Societe extends Entity {
    id?: string;
    nomSociete: string;
    rib: string;
    formeJuridique: string;
    respCivile: string;
    codeTVA: string;
    address: Addresse;
    site: string;
    tel: string;
    fax: string;
    constructor(data?: Partial<Societe>);
}
export interface SocieteRelations {
}
export declare type SocieteWithRelations = Societe & SocieteRelations;
