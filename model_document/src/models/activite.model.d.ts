import { Entity } from '@loopback/repository';
export declare class Activite extends Entity {
    id: string;
    date?: string;
    nom?: string;
    docName?: string;
    action?: string;
    constructor(data?: Partial<Activite>);
}
export interface ActiviteRelations {
}
export declare type ActiviteWithRelations = Activite & ActiviteRelations;
