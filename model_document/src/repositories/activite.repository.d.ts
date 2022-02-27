import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Activite, ActiviteRelations } from '../models';
export declare class ActiviteRepository extends DefaultCrudRepository<Activite, typeof Activite.prototype.id, ActiviteRelations> {
    constructor(dataSource: MongoDbDataSource);
}
