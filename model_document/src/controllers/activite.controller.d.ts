import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Activite } from '../models';
import { ActiviteRepository } from '../repositories';
export declare class ActiviteController {
    activiteRepository: ActiviteRepository;
    constructor(activiteRepository: ActiviteRepository);
    create(activite: Omit<Activite, 'id'>): Promise<Activite>;
    count(where?: Where<Activite>): Promise<Count>;
    find(filter?: Filter<Activite>): Promise<Activite[]>;
    updateAll(activite: Activite, where?: Where<Activite>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Activite>): Promise<Activite>;
    updateById(id: string, activite: Activite): Promise<void>;
    replaceById(id: string, activite: Activite): Promise<void>;
    deleteById(id: string): Promise<void>;
}
