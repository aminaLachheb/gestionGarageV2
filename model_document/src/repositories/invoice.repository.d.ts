import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Invoice, InvoiceRelations, Document } from '../models';
import { DocumentRepository } from './document.repository';
export declare class InvoiceRepository extends DefaultCrudRepository<Invoice, typeof Invoice.prototype.id, InvoiceRelations> {
    protected documentRepositoryGetter: Getter<DocumentRepository>;
    readonly document: HasOneRepositoryFactory<Document, typeof Invoice.prototype.id>;
    constructor(dataSource: MongoDbDataSource, documentRepositoryGetter: Getter<DocumentRepository>);
}
