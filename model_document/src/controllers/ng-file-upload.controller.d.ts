import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { NgFileUpload } from '../models';
import { NgFileUploadRepository } from '../repositories';
export declare class NgFileUploadController {
    ngFileUploadRepository: NgFileUploadRepository;
    NGTransactionRepository: NgFileUploadRepository;
    constructor(ngFileUploadRepository: NgFileUploadRepository, NGTransactionRepository: NgFileUploadRepository);
    create(ngFileUpload: Omit<NgFileUpload, 'id'>): Promise<NgFileUpload>;
    count(where?: Where<NgFileUpload>): Promise<Count>;
    find(filter?: Filter<NgFileUpload>): Promise<NgFileUpload[]>;
    updateAll(ngFileUpload: NgFileUpload, where?: Where<NgFileUpload>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<NgFileUpload>): Promise<NgFileUpload>;
    updateById(id: string, ngFileUpload: NgFileUpload): Promise<void>;
    replaceById(id: string, ngFileUpload: NgFileUpload): Promise<void>;
    deleteById(id: string): Promise<void>;
    uploadFile(fileName: string, ngFileUpload: Omit<NgFileUpload, 'id'>): Promise<any>;
    postSign(): Promise<string>;
}
