import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Societe } from '../models';
import { SocieteRepository } from '../repositories';
export declare class SocieteController {
    societeRepository: SocieteRepository;
    constructor(societeRepository: SocieteRepository);
    create(societe: Omit<Societe, 'id'>): Promise<Societe>;
    count(where?: Where<Societe>): Promise<Count>;
    find(filter?: Filter<Societe>): Promise<Societe[]>;
    updateAll(societe: Societe, where?: Where<Societe>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Societe>): Promise<Societe>;
    updateById(id: string, societe: Societe): Promise<void>;
    replaceById(id: string, societe: Societe): Promise<void>;
    deleteById(id: string): Promise<void>;
}
