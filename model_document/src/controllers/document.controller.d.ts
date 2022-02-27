import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Document } from '../models';
import { DocumentRepository, InvoiceRepository } from '../repositories';
export declare class DocumentController {
    documentRepository: DocumentRepository;
    invoiceRepository: InvoiceRepository;
    constructor(documentRepository: DocumentRepository, invoiceRepository: InvoiceRepository);
    create(document: Omit<Document, 'id'>): Promise<Document>;
    count(where?: Where<Document>): Promise<Count>;
    countSigne(where?: Where<Document>): Promise<Count>;
    countNonSigne(where?: Where<Document>): Promise<Count>;
    countProjetNonSigne(projet: string, where?: Where<Document>): Promise<Count>;
    countProjetSigne(projet: string, where?: Where<Document>): Promise<Count>;
    find(filter?: Filter<Document>): Promise<Document[]>;
    updateAll(document: Document, where?: Where<Document>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Document>): Promise<Document>;
    updateById(id: string, document: Document): Promise<void>;
    replaceById(id: string, document: Document): Promise<void>;
    deleteById(id: string): Promise<void>;
    download(): Promise<any>;
}
