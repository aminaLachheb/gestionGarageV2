import { Model } from '@loopback/repository';
import { Envelope } from './envelope.model';
export declare class NodeMailer extends Model {
    accepted: string[];
    rejected: string[];
    envelopeTime: number;
    messageTime: number;
    messageSize: number;
    response: string;
    envelope: Envelope;
    messageId: string;
    constructor(data?: Partial<NodeMailer>);
}
export interface NodeMailerRelations {
}
export declare type NodeMailerWithRelations = NodeMailer & NodeMailerRelations;
