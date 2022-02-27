import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Voiture, VoitureRelations} from '../models';

export class VoitureRepository extends DefaultCrudRepository<
  Voiture,
  typeof Voiture.prototype.id,
  VoitureRelations
> {
  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource,
  ) {
    super(Voiture, dataSource);
  }
}
