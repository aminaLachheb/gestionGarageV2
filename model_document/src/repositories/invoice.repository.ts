import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Invoice, InvoiceRelations, Document} from '../models';
import {DocumentRepository} from './document.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly document: HasOneRepositoryFactory<Document, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource, @repository.getter('DocumentRepository') protected documentRepositoryGetter: Getter<DocumentRepository>,
  ) {
    super(Invoice, dataSource);
    this.document = this.createHasOneRepositoryFactoryFor('document', documentRepositoryGetter);
    this.registerInclusionResolver('document', this.document.inclusionResolver);

  }
}
