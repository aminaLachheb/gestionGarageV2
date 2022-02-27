import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Activite, ActiviteRelations} from '../models';

export class ActiviteRepository extends DefaultCrudRepository<
  Activite,
  typeof Activite.prototype.id,
  ActiviteRelations
> {
  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource,
  ) {
    super(Activite, dataSource);
  }
}
