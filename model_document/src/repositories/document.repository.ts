import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Document, DocumentRelations} from '../models';
import {InvoiceRepository} from './invoice.repository';

export class DocumentRepository extends DefaultCrudRepository<
  Document,
  typeof Document.prototype.identifier,
  DocumentRelations> {

  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(Document, dataSource);
  }
}
