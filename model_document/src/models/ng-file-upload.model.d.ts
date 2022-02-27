import { Entity } from '@loopback/repository';
export declare class NgFileUpload extends Entity {
    id?: string;
    fileName: string;
    fileExtension: string;
    fileBase64: string;
    constructor(data?: Partial<NgFileUpload>);
}
export interface NgFileUploadRelations {
}
export declare type NgFileUploadWithRelations = NgFileUpload & NgFileUploadRelations;
