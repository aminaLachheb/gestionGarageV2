import { Entity } from '@loopback/repository';
export declare class Voiture extends Entity {
    id?: string;
    model?: string;
    marque: string;
    annee: number;
    prix: number;
    status: string;
    lien: string;
    employe: string;
    prixVente: number;
    constructor(data?: Partial<Voiture>);
}
export interface VoitureRelations {
}
export declare type VoitureWithRelations = Voiture & VoitureRelations;
