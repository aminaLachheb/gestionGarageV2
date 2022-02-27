import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { NgTransaction } from '../models';
import { DocumentRepository, NgFileUploadRepository, NgTransactionRepository } from '../repositories';
export declare class NgTransactionController {
    documentRepository: DocumentRepository;
    ngFileUploadRepository: NgFileUploadRepository;
    ngTransactionRepository: NgTransactionRepository;
    transaction: NgTransaction;
    constructor(documentRepository: DocumentRepository, ngFileUploadRepository: NgFileUploadRepository, ngTransactionRepository: NgTransactionRepository);
    create(fileName: string): Promise<NgTransaction>;
    count(where?: Where<NgTransaction>): Promise<Count>;
    find(filter?: Filter<NgTransaction>): Promise<NgTransaction[]>;
    updateAll(ngTransaction: NgTransaction, where?: Where<NgTransaction>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<NgTransaction>): Promise<NgTransaction>;
    updateById(id: string, ngTransaction: NgTransaction): Promise<void>;
    replaceById(id: string, ngTransaction: NgTransaction): Promise<void>;
    deleteById(id: string): Promise<void>;
    postSign(uuid: string, fileId: string): Promise<string>;
}
