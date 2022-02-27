import { Model } from '@loopback/repository';
export declare class Envelope extends Model {
    from: string;
    to: string;
    constructor(data?: Partial<Envelope>);
}
export interface EnvelopeRelations {
}
export declare type EnvelopeWithRelations = Envelope & EnvelopeRelations;
