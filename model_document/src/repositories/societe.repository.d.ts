import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Societe, SocieteRelations } from '../models';
export declare class SocieteRepository extends DefaultCrudRepository<Societe, typeof Societe.prototype.id, SocieteRelations> {
    constructor(dataSource: MongoDbDataSource);
}
