import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { InvoiceTief, InvoiceTiefRelations } from '../models';
export declare class InvoiceTiefRepository extends DefaultCrudRepository<InvoiceTief, typeof InvoiceTief.prototype.documentIdentifier, InvoiceTiefRelations> {
    constructor(dataSource: MongoDbDataSource);
}
