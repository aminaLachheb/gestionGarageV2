import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { NgFileUpload, NgFileUploadRelations } from '../models';
export declare class NgFileUploadRepository extends DefaultCrudRepository<NgFileUpload, typeof NgFileUpload.prototype.id, NgFileUploadRelations> {
    constructor(dataSource: MongoDbDataSource);
}
