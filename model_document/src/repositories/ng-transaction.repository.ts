import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {NgTransaction, NgTransactionRelations} from '../models';

export class NgTransactionRepository extends DefaultCrudRepository<
  NgTransaction,
  typeof NgTransaction.prototype.uuid,
  NgTransactionRelations
> {
  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource,
  ) {
    super(NgTransaction, dataSource);
  }
}
