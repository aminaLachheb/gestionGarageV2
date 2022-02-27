import { Count, Filter, Where } from '@loopback/repository';
import { Invoice, Document } from '../models';
import { InvoiceRepository } from '../repositories';
export declare class InvoiceDocumentController {
    protected invoiceRepository: InvoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    get(id: string, filter?: Filter<Document>): Promise<Document>;
    create(id: typeof Invoice.prototype.id, document: Omit<Document, 'identifier'>): Promise<Document>;
    patch(id: string, document: Partial<Document>, where?: Where<Document>): Promise<Count>;
    delete(id: string, where?: Where<Document>): Promise<Count>;
}
