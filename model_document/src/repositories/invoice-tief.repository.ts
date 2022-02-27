import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {InvoiceTief, InvoiceTiefRelations} from '../models';

export class InvoiceTiefRepository extends DefaultCrudRepository<
  InvoiceTief,
  typeof InvoiceTief.prototype.documentIdentifier,
  InvoiceTiefRelations
> {
  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource,
  ) {
    super(InvoiceTief, dataSource);
  }
}
