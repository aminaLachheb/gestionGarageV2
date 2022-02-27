import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Invoice } from '../models';
import { DocumentRepository, InvoiceRepository, SocieteRepository } from '../repositories';
export declare class InvoiceController {
    invoiceRepository: InvoiceRepository;
    documentRepository: DocumentRepository;
    societeRepository: SocieteRepository;
    constructor(invoiceRepository: InvoiceRepository, documentRepository: DocumentRepository, societeRepository: SocieteRepository);
    create(invoice: Omit<Invoice, 'id'>): Promise<any>;
    count(where?: Where<Invoice>): Promise<Count>;
    find(filter?: Filter<Invoice>): Promise<Invoice[]>;
    updateAll(invoice: Invoice, where?: Where<Invoice>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Invoice>): Promise<Invoice>;
    updateById(id: string, invoice: Invoice): Promise<void>;
    replaceById(id: string, invoice: Invoice): Promise<void>;
    deleteById(id: string): Promise<void>;
}
