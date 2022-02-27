import { Getter } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Document, DocumentRelations } from '../models';
import { InvoiceRepository } from './invoice.repository';
export declare class DocumentRepository extends DefaultCrudRepository<Document, typeof Document.prototype.identifier, DocumentRelations> {
    protected invoiceRepositoryGetter: Getter<InvoiceRepository>;
    constructor(dataSource: MongoDbDataSource, invoiceRepositoryGetter: Getter<InvoiceRepository>);
}
