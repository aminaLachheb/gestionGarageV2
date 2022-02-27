import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { NgTransaction, NgTransactionRelations } from '../models';
export declare class NgTransactionRepository extends DefaultCrudRepository<NgTransaction, typeof NgTransaction.prototype.uuid, NgTransactionRelations> {
    constructor(dataSource: MongoDbDataSource);
}
