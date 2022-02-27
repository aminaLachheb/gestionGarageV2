import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Societe, SocieteRelations} from '../models';

export class SocieteRepository extends DefaultCrudRepository<
  Societe,
  typeof Societe.prototype.id,
  SocieteRelations
> {
  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource,
  ) {
    super(Societe, dataSource);
  }
}
