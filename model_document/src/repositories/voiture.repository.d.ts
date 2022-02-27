import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Voiture, VoitureRelations } from '../models';
export declare class VoitureRepository extends DefaultCrudRepository<Voiture, typeof Voiture.prototype.id, VoitureRelations> {
    constructor(dataSource: MongoDbDataSource);
}
