import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {NgFileUpload, NgFileUploadRelations} from '../models';

export class NgFileUploadRepository extends DefaultCrudRepository<
  NgFileUpload,
  typeof NgFileUpload.prototype.id,
  NgFileUploadRelations
> {
  constructor(
    @inject('datasources.mongo_db') dataSource: MongoDbDataSource,
  ) {
    super(NgFileUpload, dataSource);
  }
}
